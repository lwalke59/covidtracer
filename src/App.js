import React, { Component } from 'react';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { AmplifyButton, withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [{ occupants: 0 }]
    };
  };

  async componentDidMount() {
    try {
      const stores = await API.graphql(graphqlOperation(queries.listStores))
      this.setState({
        stores: stores.data.listStores.items
      })
    } catch (err) {
      console.log('error fetching stores...', err)
    }

    API.graphql(graphqlOperation(subscriptions.onCheckIn)).subscribe({
      next: (checkedIn) => {
        const id = checkedIn.value.data.onCheckIn.id
        const occupants = checkedIn.value.data.onCheckIn.occupants
        const stores = this.state.stores
        const row = stores.find(store => store.id === id);
        row.occupants = occupants;
        this.setState({ occupants: stores });
      }
    })
    API.graphql(graphqlOperation(subscriptions.onCheckOut)).subscribe({
      next: (checkedOut) => {
        const id = checkedOut.value.data.onCheckOut.id
        const occupants = checkedOut.value.data.onCheckOut.occupants
        const stores = this.state.stores
        const row = stores.find(store => store.id === id);
        row.occupants = occupants;
        this.setState({ occupants: stores });
      }
    })
  };

  render() {
    return (
      <div style={styles.container} >
        <div>
          <div> Occupants: {this.state.stores[0].occupants}</div>
          <br></br>
          <div>
            {this.state.stores.map((store) =>
              <Checkin
                key={store.id}
                id={store.id}
                name={store.name}
                occupants={store.occupants}
              />
            )}
          </div>
          <br></br>
          <AmplifySignOut />
        </div>
      </div >
    )
  }
}

class Checkin extends Component {
  constructor(props) {
    super(props);
    let action = "Check-in";

    this.state = {
      action: action,
    };
  };
  handleSubmit = async (event) => {
    // Get current user information
    var currentUser = await Auth.currentUserInfo();
    var username = currentUser["username"];
    var email = currentUser["attributes"]["email"];
    var phonenumber = currentUser["attributes"]["phone_number"];
    var timestamp = new Date().toISOString();

    if (this.state.action === "Check-in") { // Check-in
      const checkIn = {
        id: event.id
      };
      const Patron = {
        username: username,
        email: email,
        phone_number: phonenumber,
        check_in_time: timestamp
      }
      await API.graphql(graphqlOperation(mutations.checkIn, { input: checkIn }));
      var createPatronResponse = await API.graphql(graphqlOperation(mutations.createPatron, { input: Patron }));
      var id = (createPatronResponse["data"]["createPatron"]['id']);
      this.setState({
        id: id,
        action: "Check-out"
      })
    }
    else { // Check-out
      const checkOut = {
        id: event.id
      };
      const Patron = {
        id: this.state.id,
        username: username,
        email: email,
        phone_number: phonenumber,
        check_out_time: timestamp
      }
      await API.graphql(graphqlOperation(mutations.checkOut, { input: checkOut }));
      await API.graphql(graphqlOperation(mutations.updatePatron, { input: Patron }));
      this.setState({
        action: "Check-in"
      })
    }
  };

  render() {
    return (
      <AmplifyButton onClick={() => this.handleSubmit(this.props)}>{this.state.action}</AmplifyButton>
    );
  }
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
}

export default withAuthenticator(App)
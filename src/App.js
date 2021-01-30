import React, { Component } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { AmplifyButton } from '@aws-amplify/ui-react';
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
        console.log("state:", this.state.stores)
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
        console.log("state:", this.state.stores)
      }
    })
  };

  render() {
    return (
      <div style={styles.container} >
        <div> Occupants: {this.state.stores[0].occupants}</div>
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
        <div>
          <br></br>
        </div>
        <div>
          {this.state.stores.map((store) =>
            <Checkout
              key={store.id}
              id={store.id}
              name={store.name}
              occupants={store.occupants}
            />
          )}
        </div>
      </div >
    )
  }
}

class Checkin extends Component {
  handleSubmit = async (event) => {
    const checkIn = {
      id: event.id
    };
    await API.graphql(graphqlOperation(mutations.checkIn, { input: checkIn }));
  };

  render() {
    return (
      <AmplifyButton onClick={() => this.handleSubmit(this.props)}>Check-In</AmplifyButton>
    );
  }
}

class Checkout extends Component {
  handleSubmit = async (event) => {
    const checkOut = {
      id: event.id
    };
    await API.graphql(graphqlOperation(mutations.checkOut, { input: checkOut }));
  };

  render() {
    return (
      <AmplifyButton onClick={() => this.handleSubmit(this.props)}>Check-Out</AmplifyButton>
    );
  }
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
}

export default App;

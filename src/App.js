import React, { Component } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: []
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
  };

  render() {
    const candidateColors = ["red", "orange", "green", "blue"];
    return (
      <div className="App">
        <div className="container mx-auto md:w-3/5 px-3">
          <div className="text-grey-darkest md:text-lg italic mt-2 mb-3">Which is your favourite AWS serverless service?</div>
          <div className="flex py-2">
            {this.state.stores.map((store, idx) =>
              <Store
                key={store.id}
                id={store.id}
                name={store.name}
                occupants={store.occupants}
                color={candidateColors[idx]}
              />
            )}
          </div>
        </div>
        <div className="container mx-auto md:w-3/5 px-3">
          <h1 className="text-lg text-grey-darkest py-6">Live updates</h1>
        </div>
      </div>
    )
  }
}

class Store extends Component {
  handleSubmit = async (event) => {
    const checkIn = {
      id: event.id
    };
    await API.graphql(graphqlOperation(mutations.checkIn, { input: checkIn }));
  };

  render() {
    return (
      <button
        className={`focus:outline-none flex-1 text-white py-2 px-3 mx-1 text-sm md:h-12 h-16 rounded bg-${this.props.color}-dark hover:bg-${this.props.color}-darker`}
        onClick={() =>
          this.handleSubmit(this.props)
        }>
        <b>{this.props.name}</b> <p className="py-1"><b>{this.props.occupants}</b></p>
      </button>
    );
  }
}

export default App;

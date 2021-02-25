import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
var QRCode = require('qrcode.react');

class Store extends Component {
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
                    <div> Occupancy: {this.state.stores[0].occupants}/100</div>
                    <br></br>
                    <div> Scan to check in to store</div>
                    <br></br>
                    <br></br>
                    <QRCode value="https://d3ef4hnn53sef0.cloudfront.net" />
                </div>
            </div >
        )
    }
}

const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
}

export default Store
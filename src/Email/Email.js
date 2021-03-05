import React, { Component } from 'react';
import axios from 'axios';
import { AmplifyButton } from '@aws-amplify/ui-react';

class Email extends Component {

    async sendEmail() {
        var response = await axios.get('https://7xb20uy0rl.execute-api.us-east-1.amazonaws.com/sendEmail-dev', {
            params: {
                start_time: '2021-03-05T15:19:16.555Z',
                end_time: '2021-03-05T15:19:59.555Z'
            }
        })
        console.log(response);
    }

    render() {
        return (
            <div style={styles.container}>
                <AmplifyButton onClick={this.sendEmail}> Send Email</AmplifyButton>
            </div >
        )
    }
}

const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, textAlign: 'center', },
}

export default Email

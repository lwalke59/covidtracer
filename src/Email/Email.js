import React, { Component } from 'react';
import axios from 'axios';
import { AmplifyButton } from '@aws-amplify/ui-react';

class Email extends Component {

    async sendEmail() {
        let startTime = document.getElementById("start-time").value;
        let endTime = document.getElementById("end-time").value;
        let startTimeISO = new Date(startTime).toISOString();
        let endTimeISO = new Date(endTime).toISOString();
        var response = await axios.get('https://7xb20uy0rl.execute-api.us-east-1.amazonaws.com/sendEmail-dev', {
            params: {
                start_time: startTimeISO,
                end_time: endTimeISO
            }
        })
        console.log(response);
        alert("Succesfully emailed exposure notification to those in store between " + startTime + " and " + endTime);
    }

    render() {
        return (
            <div style={styles.container}>
                <h2>Select time range of COVID-19 exposure to notify customers about potential contact by email</h2>
                <div>

                    <label htmlFor="start-time">Choose a start time:</label>
                    <br></br>

                    <input type="datetime-local" id="start-time"
                        name="start-time" defaultValue="2021-03-01T19:30"></input>
                </div>
                <br></br>
                <div>
                    <label htmlFor="send-time">Choose an end time:</label>
                    <br></br>

                    <input type="datetime-local" id="end-time"
                        name="end-time" defaultValue="2021-03-01T19:30"></input>
                </div>
                <div>
                    <br></br>
                    <AmplifyButton onClick={this.sendEmail}> Send Email</AmplifyButton>
                </div>
            </div >
        )
    }
}

const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, textAlign: 'center', marginTop: 20 },
}

export default Email

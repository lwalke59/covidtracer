/* Amplify Params - DO NOT EDIT
    API_CAPACITYCOUNT_GRAPHQLAPIIDOUTPUT
    API_CAPACITYCOUNT_PATRONTABLE_ARN
    API_CAPACITYCOUNT_PATRONTABLE_NAME
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const qs = require('querystring');
var docClient = new AWS.DynamoDB.DocumentClient();
var ses = new AWS.SES({ region: "us-east-1" });

var tableName = process.env.API_CAPACITYCOUNT_PATRONTABLE_NAME;

exports.handler = async (event) => {
    var start_time = event["queryStringParameters"]['start_time'];
    var end_time = event["queryStringParameters"]['end_time'];

    if (start_time === undefined || end_time === undefined) {
        return {
            statusCode: 400,
            body: JSON.stringify("Start time or end time is missing"),
        };
    }

    var data;
    var emails = [];
    var params = {
        TableName: tableName,
        ProjectionExpression: "email",
        FilterExpression: "check_in_time BETWEEN :start_time and :end_time",
        ExpressionAttributeValues: {
            ":start_time": start_time,
            ":end_time": end_time
        }
    };

    try {
        data = await docClient.scan(params).promise();
    }
    catch (error) {
        console.error(error);
    }
    var email_list = data['Items'];
    if (email_list.length === 0) {
        return {
            statusCode: 200,
            body: JSON.stringify('No emails in list'),
        };
    }

    var i;
    for (i = 0; i < email_list.length; i++) {
        if (!emails.includes(email_list[i].email)) {
            emails.push(email_list[i].email);
        }
    }
    console.log(emails);

    var emailparams = {
        Destination: {
            ToAddresses: emails,
        },
        Message: {
            Body: {
                Text: { Data: "COVID-19 Exposure Notifcation" },
            },

            Subject: { Data: "Hello. You may have been exposed to COVID-19." },
        },
        Source: "covidtracerdemo@gmail.com",
    };

    await ses.sendEmail(emailparams).promise();
    return {
        statusCode: 200,
        body: JSON.stringify('Success'),
    };
};

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
// var start_time = "2021-03-05T15:19:16.555Z";
// var end_time = "2021-03-05T15:19:59.555Z";

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
            statusCode: 400,
            body: JSON.stringify('No emails in list'),
        };
    }

    var i;
    for (i = 0; i < email_list.length; i++) {
        emails.push(email_list[i].email);
    }
    console.log(emails);

    var emailparams = {
        Destination: {
            ToAddresses: ["lwalke59@uwo.ca"],
        },
        Message: {
            Body: {
                Text: { Data: "Test" },
            },

            Subject: { Data: "Test Email" },
        },
        Source: "lwalke59@uwo.ca",
    };

    // return ses.sendEmail(emailparams).promise();
    return {
        statusCode: 200,
        body: JSON.stringify('Success'),
    };
};

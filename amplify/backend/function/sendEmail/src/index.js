/* Amplify Params - DO NOT EDIT
    API_CAPACITYCOUNT_GRAPHQLAPIIDOUTPUT
    API_CAPACITYCOUNT_PATRONTABLE_ARN
    API_CAPACITYCOUNT_PATRONTABLE_NAME
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = process.env.API_CAPACITYCOUNT_PATRONTABLE_NAME;
var start_time = "2021-03-05T15:19:16.555Z";
var end_time = "2021-03-05T15:19:59.555Z";

exports.handler = async (event) => {
    var data;
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
    console.log(data);
    return true;
};

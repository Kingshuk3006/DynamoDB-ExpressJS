const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const getALlEmployeeofOrganization = async(orgId)=>{
    var params = {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: '#PK = :PK and begins_with(#SK, :SK)',
        ExpressionAttributeNames: {
            "#PK": "PK",
            "#SK": "SK"
        },
        ExpressionAttributeValues: {
            ':PK': `ORG#${orgId}`,
            ':SK': "EMP#"
        }
    };

    const queryPromise = await dynamodb.query(params).promise()
    if (queryPromise) {
        return queryPromise
    } else {
        return null
    }
}

module.exports = getALlEmployeeofOrganization
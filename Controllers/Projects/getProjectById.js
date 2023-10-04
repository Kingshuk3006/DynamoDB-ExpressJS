const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const getProjectById = async (orgId, proId) => {
    var params = {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: '#PK = :PK and #SK = :SK',
        ExpressionAttributeNames: {
            "#PK": "PK",
            "#SK": "SK"
        },
        ExpressionAttributeValues: {
            ':PK': `ORG#${orgId}`,
            ':SK': `PRO#${proId}`
        }
    };
    const queryPromise = await dynamodb.query(params).promise()
    if (queryPromise) {
        return queryPromise
    } else {
        return null
    }
}

module.exports = getProjectById
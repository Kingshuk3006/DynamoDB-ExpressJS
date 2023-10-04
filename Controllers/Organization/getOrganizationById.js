const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const getOrganizationById = async (id) => {
    var params = {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: '#PK = :PK and #SK = :SK',
        ExpressionAttributeNames: {
            "#PK": "PK",
            "#SK": "SK"
        },
        ExpressionAttributeValues: {
            ':PK': `ORG#${id}`,
            ':SK': `#METADATA#${id}`
        }
    };
    const queryPromise = await dynamodb.query(params).promise()
    if (queryPromise) {
        return queryPromise
    } else {
        return null
    }
}

module.exports = getOrganizationById
const dynamodb = require('../../Database/db.config')
require("dotenv").config()


const getOrganizationByName = async (name) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        IndexName: 'Filter-By-Name',
        KeyConditionExpression: '#name = :name',
        ExpressionAttributeNames: {
            "#name": "name",
        },
        ExpressionAttributeValues: {
            ':name': `${name}`,
        }
    }

    const queryPromise = await dynamodb.query(params).promise()
    if (queryPromise) {
        return queryPromise
    } else {
        return null
    }

}

module.exports = getOrganizationByName;
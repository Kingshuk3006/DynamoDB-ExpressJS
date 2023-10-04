const dynamodb = require('../../Database/db.config')
require("dotenv").config()


const updateOrganization = async (id, value) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: { PK: `ORG#${id}`, SK: `#METADATA#${id}` },
        UpdateExpression: `set #tier = :tier`,
        ExpressionAttributeNames: { '#tier': 'tier' },
        ExpressionAttributeValues: {
            ':tier': value,
        }
    };

    dynamodb.update(params, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
}

module.exports = updateOrganization


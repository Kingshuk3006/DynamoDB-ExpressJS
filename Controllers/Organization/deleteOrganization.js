const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const deleteOrganization = async (orgId) => {
    var params = {
        TableName: process.env.TABLE_NAME,
        Key: { PK: `ORG#${orgId}`, SK: `#METADATA#${orgId}` }
    };

    dynamodb.delete(params, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
}

module.exports = deleteOrganization
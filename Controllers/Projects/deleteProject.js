const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const deleteProject = async (orgId, proId) => {
    var params = {
        TableName: process.env.TABLE_NAME,
        Key: { PK: `ORG#${orgId}`, SK: `PRO#${proId}` }
    };

    dynamodb.delete(params, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
}

module.exports = deleteProject
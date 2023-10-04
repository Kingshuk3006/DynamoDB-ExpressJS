const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const deleteEmployee = async (orgId, empId) => {
    var params = {
        TableName: process.env.TABLE_NAME,
        Key: { PK: `ORG#${orgId}`, SK: `EMP#${empId}` }
    };

    dynamodb.delete(params, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
}

module.exports = deleteEmployee
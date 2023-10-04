const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const assignEmployeeToProject = async(orgId, empId, proId)=>{
    var params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'PK': `ORG#${orgId}#PRO#${proId}`,
            'SK': `ORG#${orgId}#EMP#${empId}`,
            'start-date': Date.now(),
        }
    };
    dynamodb.put(params, (err) => {
        if (err) {
            throw err   
        }
        else {
            console.log("Created Successfully")
        }
    });
}

module.exports = assignEmployeeToProject
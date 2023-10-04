const { v4: uuidv4 } = require('uuid')
const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const empId = uuidv4();

const createEmployee = async (orgId, empName, email, salary) => {
    var params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'PK': `ORG#${orgId}`,
            'SK': `EMP#${empId}`,
            'name': empName,
            'email': email,
            'join-date': Date.now(),
            'salary': salary,
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

module.exports = createEmployee
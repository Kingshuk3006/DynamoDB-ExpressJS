const { v4: uuidv4 } = require('uuid')
const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const proId = uuidv4();

const createProject = async (orgId, projectName, deadline, complexity) => {
    var params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'PK': `ORG#${orgId}`,
            'SK': `PRO#${proId}`,
            'name': projectName,
            'start-date': Date.now(),
            'deadline': deadline,
            'complexity': complexity
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

module.exports = createProject
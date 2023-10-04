const dynamodb = require('../../Database/db.config');
const getEmployeeById = require('./getEmployeeById');
require("dotenv").config()


const getAllEmployeeOfProject = async (proId, orgId) => {

    var params = {
        TableName: process.env.TABLE_NAME,
        IndexName: 'Project-Employee-Index',
        KeyConditionExpression: '#PK = :PK',
        ExpressionAttributeNames: {
            "#PK": "PK",
        },
        ExpressionAttributeValues: {
            ':PK': `ORG#${orgId}#PRO#${proId}`,
        }
    };

    const queryPromise = await dynamodb.query(params).promise()
    const employeeIdArr = queryPromise.Items.map(item => {
        const startIndex = item.SK.indexOf("#EMP#")
        const empId = item.SK.substr(startIndex + 5);
        return empId;
    })

    let allEmployee = [];
    async function getDataEmployee() {
        for (let i = 0; i < employeeIdArr?.length; i++) {
            let _emp = await getEmployeeById(orgId, employeeIdArr[i]);
            allEmployee.push(_emp.Items[0]);
        }
    }
    await getDataEmployee();

    return allEmployee;

}

module.exports = getAllEmployeeOfProject
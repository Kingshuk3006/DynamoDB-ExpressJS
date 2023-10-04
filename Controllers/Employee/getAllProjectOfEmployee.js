const dynamodb = require('../../Database/db.config')
const getProjectById = require('../Projects/getProjectById')
require("dotenv").config()

const getAllProjectOfEmployee = async (orgId, empId) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        IndexName: 'Project-Employee-Index',
        KeyConditionExpression: '#SK = :SK',
        ExpressionAttributeNames: {
            "#SK": "SK",
        },
        ExpressionAttributeValues: {
            ':SK': `ORG#${orgId}#EMP#${empId}`,
        }
    }

    try {
        const queryPromise = await dynamodb.query(params).promise()

        const projectIdArr = queryPromise.Items.map(item => {
            const startIndex = item.PK.indexOf("#PRO#")
            const proId = item.PK.substr(startIndex + 5);
            return proId;
        })
        let allProject = [];
        async function getAllProject() {
            for (let i = 0; i < projectIdArr?.length; i++) {
                let _pro = await getProjectById(orgId, projectIdArr[i]);
                allProject.push(_pro.Items[0]);
            }
        }
        await getAllProject();
        return allProject;

    } catch (err) {
        console.log(err)
    }

}

module.exports = getAllProjectOfEmployee
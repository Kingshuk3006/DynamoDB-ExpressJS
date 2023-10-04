const dynamodb = require('../../Database/db.config')
require("dotenv").config()

function formatObjectAsExpressionAttributeNames(obj) {
    const expressions = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const formattedKey = `#${key}`;
            const value = obj[key];
            const formattedExpression = `${formattedKey} = :${key}`;
            expressions.push(formattedExpression);
        }
    }

    return expressions.join(', ');
}

function formatExpressionAttributeNames(obj) {
    let expression = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            expression[`#${key}`] = key
        }
    }
    return expression
}

function formatExpressionAttributeValues(obj) {
    let expression = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            expression[`:${key}`] = obj[key]
        }
    }
    return expression
}


const updateProject = async (orgId, proId, updateObj) => {
    const UpdateExpression = formatObjectAsExpressionAttributeNames(updateObj);
    const attributeName = formatExpressionAttributeNames(updateObj)
    const attributValue = formatExpressionAttributeValues(updateObj)

    const params = {
        TableName: process.env.TABLE_NAME,
        Key: { PK: `ORG#${orgId}`, SK: `PRO#${proId}` },
        UpdateExpression: `SET ${UpdateExpression}`,
        ExpressionAttributeNames: attributeName,
        ExpressionAttributeValues: attributValue
    };

    dynamodb.update(params, function (err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
}

module.exports = updateProject
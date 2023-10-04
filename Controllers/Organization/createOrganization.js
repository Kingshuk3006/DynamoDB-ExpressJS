const { v4: uuidv4 } = require('uuid')
const dynamodb = require('../../Database/db.config')
require("dotenv").config()

const orgId = uuidv4();

const createOrganization = async (orgName, orgTier) => {
    var params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'PK': `ORG#${orgId}`,
            'SK': `#METADATA#${orgId}`,
            'name': orgName,
            'tier': orgTier,
            'organization_id': orgId
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

module.exports = createOrganization
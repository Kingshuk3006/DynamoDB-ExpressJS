const express = require('express')
const createOrganization = require('../Controllers/Organization/createOrganization')
const getOrganizationById = require('../Controllers/Organization/getOrganizationById')
const updateOrganization = require('../Controllers/Organization/updateOrganization')
const deleteOrganization = require('../Controllers/Organization/deleteOrganization')
const getOrganizationByName = require('../Controllers/Organization/getOrganizationByName')
const router = express.Router()


router.post('/create', async (req, res) => {
    const orgName = req.body.name
    const orgTier = req.body.tier

    try {
        await createOrganization(orgName, orgTier)
        res.status(200).send("Organization created Successfully")
    } catch (err) {
        res.status(500).send("there was an error creating organization")
    }
})

router.get('/get-organization-by-id/:orgId', async (req, res) => {
    const orgId = req.params.orgId

    try {
        const organization = await getOrganizationById(orgId)
        res.status(200).send(organization)
    } catch (err) {
        res.status(500).send("No such organization")
        console.log("error: ", err)
    }
})

router.post('/update/:orgId', async (req, res) => {
    const orgId = req.params.orgId
    const _tier = req.body.tier

    try {
        await updateOrganization(orgId, _tier)
        res.status(200).send("Updated Successfully")
    } catch (err) {
        res.status(500).send("There was an error updating the organization")
        console.log("error: ", err)
    }
})

router.delete('/delete/:orgId', async (req, res) => {
    const orgId = req.params.orgId
    try {
        await deleteOrganization(orgId)
        res.status(200).send("Deleted Successfully")
    } catch (err) {
        res.status(500).send("There was an error deleting the organization")
    }
})

router.get('/get-organization-by-name/:orgName', async(req, res)=>{
    const orgName = req.params.orgName

    try {
        const organization = await getOrganizationByName(orgName)
        res.status(200).send(organization)
    } catch (err) {
        res.status(500).send("No such organization")
        console.log("error: ", err)
    }
})

module.exports = router
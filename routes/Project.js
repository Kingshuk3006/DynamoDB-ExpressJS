const express = require('express')
const createProject = require('../Controllers/Projects/createProject')
const updateProject = require('../Controllers/Projects/updateProject')
const getAllProjectByOrganization = require('../Controllers/Projects/getAllProjectByOrg')
const getProjectById = require('../Controllers/Projects/getProjectById')
const deleteProject = require('../Controllers/Projects/deleteProject')
const getAllEmployeeOfProject = require('../Controllers/Employee/getAllEmployeeOfProject')


const router = express.Router()

router.post('/create', async (req, res) => {
    try {
        const { projectName, orgId, deadline, complexity } = req.body
        await createProject(orgId, projectName, deadline, complexity)

        res.status(200).send("Created successfully")
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.post('/update/:id', async (req, res) => {

    try {
        const proId = req.params.id
        const orgId = req.body.orgId
        const updateObj = req.body.updateObj
        await updateProject(orgId, proId, updateObj)
        res.status(200).send("updated successfully")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

router.get(`/get-project/:proId`, async (req, res) => {
    try {
        const proId = req.params.proId
        const orgId = req.query.orgId
        const _project = await getProjectById(orgId, proId)
        res.status(200).send(_project)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/get-projects-by-org/:orgId', async (req, res) => {
    try {
        const orgId = req.params.orgId
        const _allProjects = await getAllProjectByOrganization(orgId)
        res.status(200).send(_allProjects)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

router.delete('/delete/:id', async function (req, res) {
    try {
        const proId = req.params.id
        const orgId = req.body.orgId
        await deleteProject(orgId, proId)
        res.status(200).send("deleted successfully")
    }
    catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
})


router.get('/get-employees/:proId', async (req, res) => {
    const proId = req.params.proId;
    const orgId = req.query.orgId;

    try {
        const _employee = await getAllEmployeeOfProject(proId, orgId)
        res.status(200).send(_employee);
    } catch (err) {
        res.status(500).send("There was an error while fetching");
    }
})



module.exports = router
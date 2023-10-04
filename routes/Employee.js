const express = require('express')
const createEmployee = require('../Controllers/Employee/createEmployee')
const updateEmployee = require('../Controllers/Employee/updateEmployee')
const getALlEmployeeofOrganization = require('../Controllers/Employee/getAllEmployeeOfOrg')
const deleteEmployee = require('../Controllers/Employee/deleteEmployee')
const getEmployeeById = require('../Controllers/Employee/getEmployeeById')
const assignEmployeeToProject = require('../Controllers/Employee/assignEmployeeToProject')
const getAllProjectOfEmployee = require('../Controllers/Employee/getAllProjectOfEmployee')
const router = express.Router()


router.post('/create', async (req, res) => {
    try {
        const { name, orgId, salary, email } = req.body
        await createEmployee(orgId, name, email, salary)
        res.status(200).send("Created successfully")
    } catch (err) {
        res.status(500).send("Error creating employee")
        console.log(err)
    }
})

router.post('/update/:id', async (req, res) => {

    try {
        const empId = req.params.id
        const orgId = req.body.orgId
        const updateObj = req.body.updateObj
        await updateEmployee(orgId, empId, updateObj)
        res.status(200).send("updated successfully")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/get-employees-of-org/:orgId/', async (req, res) => {
    try {
        const orgId = req.params.orgId
        const _allEmployee = await getALlEmployeeofOrganization(orgId)
        res.status(200).send(_allEmployee)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/get-employee/:id', async (req, res) => {
    try {
        const empId = req.params.id
        const orgId = req.query.orgId
        const _employee = await getEmployeeById(orgId, empId)
        res.status(200).send(_employee)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})

router.delete('/delete/:id', async function (req, res) {
    try {
        const empId = req.params.id
        const orgId = req.body.orgId
        const updateObj = req.body.updateObj
        await deleteEmployee(orgId, empId, updateObj)
        res.status(200).send("deleted successfully")
    }
    catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
})

router.post('/assign-to-project/:proId', async (req, res) => {
    try {
        const proId = req.params.proId
        const { empId, orgId } = req.body

        await assignEmployeeToProject(orgId, empId, proId)
        res.status(200).send("Assigned Successfully")
    } catch (err) {
        res.status(500).send(err.message)
        console.log(err.message)
    }
})

router.get('/get-projects/:empId', async (req, res) => {
    const empId = req.params.empId;
    const orgId = req.query.orgId;

    try {
        const _projects = await getAllProjectOfEmployee(orgId, empId)
        res.status(200).send(_projects);
    } catch (err) {
        res.status(500).send("There was an error while fetching");
    }
})

module.exports = router
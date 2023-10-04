const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 8000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const organizationRoutes = require('./routes/Organization');
const projectRoutes = require("./routes/Project")
const employeeRoutes = require("./routes/Employee")


app.use("/organization", organizationRoutes)
app.use("/project", projectRoutes)
app.use("/employee", employeeRoutes)


app.get('/', (req, res) => {
    res.send("This is Home route");
})

app.listen(PORT, () => {
    console.log("listening on port " + PORT)
});
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const timeout = require('express-timeout-handler')

require('dotenv').config();

const constants = require('./helpers/constants')
const authConfig = require('./configs/authConfig')
const corsConfig = authConfig.corsConfig;

const app = express()
const port = constants.PORT


// Routes
const v1AuthRouter = require("./v1/routes/authRoutes");
const v1TenantRouter = require("./v1/routes/tenantRoutes");
const v1UserRouter = require("./v1/routes/userRoutes");
const v1WorkspaceRouter = require("./v1/routes/workspaceRoutes");
const v1SmartPropertiesRouter = require("./v1/routes/smartPropertiesRoutes");
const v1SmartPropertiesCodeRouter = require("./v1/routes/smartPropertiesCodeRoutes");
const v1SmartPropertiesKeysRouter = require("./v1/routes/smartPropertiesKeysRoutes");
const v1SwaggerRouter = require("./v1/routes/swaggerRoutes");

const v2SmartPropertyRouter = require("./v2/routes/smartPropertyRoutes");
const v2SmartPropertyCodeRouter = require("./v2/routes/smartPropertyCodeRoutes");
const v2SmartPropertyKeyRouter = require("./v2/routes/smartPropertyKeyRoutes");
const v2SmartPropertyAiRouter = require("./v2/routes/smartProperyAi");

// Configure cors
app.options('*', cors(corsConfig));

// Configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Tenant v1
app.use("/api/v1/tenant", v1TenantRouter);

// Auth v1
app.use("/api/v1/:tenant/auth", v1AuthRouter);

// User v1
app.use("/api/v1/:tenant/user", v1UserRouter);

// Workspace v1
app.use("/api/v1/:tenant/workspace", v1WorkspaceRouter);

// Smart Properties v1
app.use("/api/v1/:tenant/smart-properties", v1SmartPropertiesRouter);

// Smart Properties Code v1
app.use("/api/v1/smart-properties-code", v1SmartPropertiesCodeRouter);

// Smart Properties Keys v1
app.use("/api/v1/smart-properties-keys", v1SmartPropertiesKeysRouter);

// Smart Property v2
app.use("/api/v2/:tenant/smart-property", v2SmartPropertyRouter);

// Smart Property Code v2
app.use("/api/v2/:tenant/smart-property-code", v2SmartPropertyCodeRouter);

// Smart Property Key v2
app.use("/api/v2/:tenant/smart-property-key", v2SmartPropertyKeyRouter);

// Smart Property AI v2
app.use("/api/v2/:tenant/ai", v2SmartPropertyAiRouter);

// Swagger v1
app.use("/api/v1/docs", v1SwaggerRouter);

// Handle timeouts
app.use(timeout.handler({ timeout: 10000, onTimeout: function(req, res) {
        if(!res.headerSent) res.status(503).send('Service unavailable. Please retry.')
}}));

// Handling non matching request from the client
app.use((req, res) => { res.status(404).send('"Not found"') });

// Init data
authConfig.initUserData();

// Configure port
app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) })

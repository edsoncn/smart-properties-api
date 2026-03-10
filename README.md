# Smart Properties API

Smart Properties API is the backend service for the Smart Properties platform. It exposes endpoints for the Smart Properties App and for integration with business applications, enabling centralized access to smart property definitions and business logic services across tenants and workspaces.

The service is responsible for connecting the platform with an Azure AI Agent to power the AI assistant experience and with Redis to store and retrieve smart property keys and code, as well as tenant, workspace, and user data. This backend supports the operational layer required to manage and serve smart properties in a consistent, reusable, and scalable way.

## Goal for This API

Expose backend endpoints for the Smart Properties App and for integration with business applications, while providing connections to the Azure AI Agent for AI assistance and to Redis for storing smart properties, tenants, workspaces, and users.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the API in production mode using `src/app.js`.

### `npm run dev`

Runs the API in development mode with `nodemon` and reloads automatically when supported files change.

### `npm run start-gendoc`

Generates or serves the Swagger documentation setup from `src/swagger.js`.

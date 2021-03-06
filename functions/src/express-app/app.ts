// the ExpressJS web-app framework for responding to http calls
import * as express from 'express';
// Middleware required for basic parsing of data (e.g. JSON parsing)
import * as bodyParser from 'body-parser';
// a dummy router for testing
import { router as testRouter } from './routers/test-router';
// Use this router for requests dealing with the database.
// This will likely be the busiest router.
import { router as databaseRouter } from './routers/database';

// create and export an express app
export const app: express.Express = express();
// Allow for JSON parsing in request bodies.
app.use(bodyParser.json());

//SECTION: set up all routers

// a dummy router just for testing.
app.use(
  // apply router to requests with url's
  // starting '/testing'
  '/testing',
  testRouter
);

app.use(
  '/database',
  databaseRouter
);
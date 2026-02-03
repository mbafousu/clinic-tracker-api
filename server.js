import express from "express";
import path from "path";
import methodOverride from "method-override";

import { logger } from "./middleware/logger.js";
import { validate } from "./middleware/validate.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

// VIEW ROUTER (pages)
import viewsRouter from "./routes/views.routes.js";

// API ROUTERS
import patientsRouter from "./routes/patients.routes.js";
import visitsRouter from "./routes/visits.routes.js";
import notesRouter from "./routes/notes.routes.js";

const app = express();
const PORT = 3000;

// View engine (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Static files
app.use(express.static(path.join(process.cwd(), "public")));

// Built-in middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Custom middleware
app.use(logger);
app.use("/api", validate);

// ROUTES 
app.use("/", viewsRouter);               
app.use("/api/patients", patientsRouter);
app.use("/api/visits", visitsRouter);
app.use("/api/notes", notesRouter);

// 404 + Error middleware 
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import path from "path";
import methodOverride from "method-override";

import { logger } from "./middleware/logger.js";
import { validate } from "./middleware/validate.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

import patientsRouter from "./routes/patients.routes.js";
import visitsRouter from "./routes/visits.routes.js";
import notesRouter from "./routes/notes.routes.js";

const app = express();
const PORT = 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Static files (CSS)
app.use(express.static(path.join(process.cwd(), "public")));

// Built-in middleware
app.use(express.urlencoded({ extended: true })); // for forms
app.use(express.json()); // for API JSON
app.use(methodOverride("_method")); // enable PATCH/DELETE from forms

// Custom middleware #1
app.use(logger);

// Custom middleware #2 (only for API routes)
app.use("/api", validate);

// Routers
app.use("/api/patients", patientsRouter);
app.use("/api/visits", visitsRouter);
app.use("/api/notes", notesRouter);

// Views
app.get("/", (req, res) => res.render("index"));
app.get("/patients", (req, res) => res.redirect("/api/patients/view"));

// Not Found + Error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));

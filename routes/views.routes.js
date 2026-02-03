import express from "express";
import { db } from "../data/data.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/patients", (req, res) => {
  res.render("patients", { patients: db.patients });
});

router.get("/patients/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const patient = db.patients.find(p => p.id === id);

  if (!patient) {
    const err = new Error("Patient not found");
    err.status = 404;
    return next(err);
  }

  const visits = db.visits.filter(v => v.patientId === id);
  const notes = db.notes.filter(n => n.patientId === id);

  
  res.render("patientsDetail", { patient, visits, notes });
});

export default router;


import express from "express";
import { db, getNextId } from "../data/data.js";

const router = express.Router();


 //GET /api/patients
 
router.get("/", (req, res) => {
  const { name, minAge } = req.query;

  let results = [...db.patients];

  if (name) {
    results = results.filter(p => p.name.toLowerCase().includes(String(name).toLowerCase()));
  }
  if (minAge) {
    results = results.filter(p => p.age >= Number(minAge));
  }

  res.json(results);
});


 // GET /api/patients/:id 

router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const patient = db.patients.find(p => p.id === id);
  if (!patient) return next(Object.assign(new Error("Patient not found"), { status: 404 }));
  res.json(patient);
});


 // POST /api/patients
 
router.post("/", (req, res, next) => {
  const { name, dob, age, mrn } = req.body;
  if (!name || !dob || !age || !mrn) {
    return next(Object.assign(new Error("name, dob, age, mrn are required"), { status: 400 }));
  }

  const newPatient = {
    id: getNextId(db.patients),
    name,
    dob,
    age: Number(age),
    mrn
  };

  db.patients.push(newPatient);
  res.status(201).json(newPatient);
});


 // PATCH /api/patients/:id
 
router.patch("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const patient = db.patients.find(p => p.id === id);
  if (!patient) return next(Object.assign(new Error("Patient not found"), { status: 404 }));

  const allowed = ["name", "dob", "age", "mrn"];
  for (const key of Object.keys(req.body)) {
    if (allowed.includes(key)) {
      patient[key] = key === "age" ? Number(req.body[key]) : req.body[key];
    }
  }

  res.json(patient);
});


 // DELETE /api/patients/:id

router.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const idx = db.patients.findIndex(p => p.id === id);
  if (idx === -1) return next(Object.assign(new Error("Patient not found"), { status: 404 }));

  // Also remove related visits/notes to keep structure reasonable

  db.visits = db.visits.filter(v => v.patientId !== id);
  db.notes = db.notes.filter(n => n.patientId !== id);

  const deleted = db.patients.splice(idx, 1)[0];
  res.json({ message: "Deleted", deleted });
});


 //VIEW: render list + form
 //GET /api/patients/view
 
router.get("/view", (req, res) => {
  res.render("patients", { patients: db.patients });
});


 // VIEW: patient detail
 // GET /api/patients/view/:id
 
router.get("/view/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const patient = db.patients.find(p => p.id === id);
  if (!patient) return next(Object.assign(new Error("Patient not found"), { status: 404 }));

  const visits = db.visits.filter(v => v.patientId === id);
  const notes = db.notes.filter(n => n.patientId === id);

  res.render("patientDetail", { patient, visits, notes });
});

export default router;

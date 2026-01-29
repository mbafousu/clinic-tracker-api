import express from "express";
import { db, getNextId } from "../data/data.js";

const router = express.Router();

// GET all visits 
router.get("/", (req, res) => {
  const { patientsId } = req.query;
  let results = [...db.visits];
  if (patientsId) results = results.filter(v => v.patientId === Number(patientsId));
  res.json(results);
});

// POST create visit
router.post("/", (req, res) => {
  const { patientsId, date, reason } = req.body;
  const newVisit = { id: getNextId(db.visits), patientsId: Number(patientsId), date, reason };
  db.visits.push(newVisit);
  res.status(201).json(newVisit);
});

// PUT replace visit
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = db.visits.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ error: "Visit not found" });

  const { patientsId, date, reason } = req.body;
  db.visits[idx] = { id, patientsId: Number(patientsId), date, reason };
  res.json(db.visits[idx]);
});

// DELETE visit
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = db.visits.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ error: "Visit not found" });

  const deleted = db.visits.splice(idx, 1)[0];
  res.json({ message: "Deleted", deleted });
});

export default router;

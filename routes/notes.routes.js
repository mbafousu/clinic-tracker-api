import express from "express";
import { db, getNextId } from "../data/data.js";

const router = express.Router();

// GET notes 
router.get("/", (req, res) => {
  const { patientId } = req.query;
  let results = [...db.notes];
  if (patientId) results = results.filter(n => n.patientId === Number(patientId));
  res.json(results);
});

// POST create note
router.post("/", (req, res) => {
  const { patientId, text } = req.body;
  const newNote = { id: getNextId(db.notes), patientId: Number(patientId), text };
  db.notes.push(newNote);
  res.status(201).json(newNote);
});

// PATCH edit note
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = db.notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ error: "Note not found" });

  if (req.body.text) note.text = req.body.text;
  res.json(note);
});

// DELETE note
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = db.notes.findIndex(n => n.id === id);
  if (idx === -1) return res.status(404).json({ error: "Note not found" });

  const deleted = db.notes.splice(idx, 1)[0];
  res.json({ message: "Deleted", deleted });
});

export default router;

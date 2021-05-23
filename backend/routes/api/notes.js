const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note } = require("../../db/models");
const router = express.Router();

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (req.body.content) note.content = req.body.content;
    if (req.body.name) note.name = req.body.name;
    await note.save();
    res.json(note);
  })
);

router.delete(
  "/:noteId",
  asyncHandler(async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findByPk(noteId);
    await note.destroy();
    console.log(note);
    res.json(note);
  })
);

module.exports = router;

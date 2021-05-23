const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note } = require("../../db/models");
const router = express.Router();

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    note.content = req.body.content;
    await note.save();
    res.json(note);
  })
);

module.exports = router;

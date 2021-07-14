const express = require("express");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Note } = require("../../db/models");
const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const note = await Note.create({
      name: req.body.name,
      content: req.body.content,
      userId: req.body.userId,
      notebookId: req.body.notebookId,
    });
    res.json(note);
  })
);

router.post(
  "/search",
  asyncHandler(async (req, res) => {
    const {listIds} = req.body
    const notes = await Note.findAll({where: {
      id: {
        [Op.in]: listIds
      }
    }})
    res.json(notes);
  })
);

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
    res.json(note);
  })
);

module.exports = router;

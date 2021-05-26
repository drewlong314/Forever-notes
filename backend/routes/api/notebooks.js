const express = require("express");
const asyncHandler = require("express-async-handler");
const { Notebook, Note } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const notebook = await Notebook.create({
      name: req.body.name,
      userId: req.body.userId,
    });
    res.json(notebook);
  })
);

router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    const notebookId = req.body.notebookId;
    const userId = req.body.id;
    const notebook = await Note.findAll({
      where: { [Op.and]: [{ notebookId }, { userId }] },
    });
    res.json(notebook);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notebook = await Notebook.findByPk(id);
    if (req.body.name) notebook.name = req.body.name;
    await notebook.save();
    res.json(notebook);
  })
);

router.delete(
  "/:notebookId",
  asyncHandler(async (req, res) => {
    const { notebookId } = req.params;
    const notebook = await Notebook.findByPk(notebookId);
    await notebook.destroy();
    res.json(notebook);
  })
);

module.exports = router;

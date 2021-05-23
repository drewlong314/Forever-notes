const express = require("express");
const asyncHandler = require("express-async-handler");
const { Notebook } = require("../../db/models");
const router = express.Router();

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
      console.log(notebook);
      res.json(notebook);
    })
  );

module.exports = router;
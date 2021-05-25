const express = require("express");
const asyncHandler = require("express-async-handler");
const { Note, Notebook } = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const query = req.body.string;
    const id = req.body.id;
    const notes = await Note.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: "%" + query + "%" } },
          { content: { [Op.iLike]: "%" + query + "%" } },
        ],
        [Op.and]: [{ userId: id }],
      },
    });
    // const notebooks = await Notebook.findAll({
    //     where: {
    //       [Op.or]: [
    //         { name: { [Op.iLike]: "%" + query + "%" } },
    //       ],
    //       [Op.and]: [{ userId: id }],
    //     },
    //   });

    // res.json({notes, notebooks});
    res.json(notes)
  })
);

module.exports = router;

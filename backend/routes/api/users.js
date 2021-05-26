const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Note, Notebook } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.get(
  "/:id/notes",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notes = await Note.findAll({
      where: {
        userId: id,
      },
    });
    res.json(notes);
  })
);

router.get(
  "/:id/notebooks",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const notebooks = await Notebook.findAll({
      where: {
        userId: id,
      },
    });
    res.json(notebooks);
  })
);

router.get(
  "/:id/notebooks/:notebookId",
  asyncHandler(async (req, res) => {
    const { id, notebookId } = req.params;
    const notes = await Note.findAll({
      where: {
        userId: id,
        notebookId: notebookId,
      },
    });
    res.json(notes);
  })
);

module.exports = router;

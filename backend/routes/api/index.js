const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const notesRouter = require("./notes.js");
const notebooksRouter = require("./notebooks.js");
const searchRouter = require("./search");

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/notes", notesRouter);

router.use("/notebooks", notebooksRouter);

router.use("/search", searchRouter);

module.exports = router;

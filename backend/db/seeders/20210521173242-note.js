"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Notes",
      [
        {
          name: "Lorem ipsum",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          userId: 1,
          notebookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Notes Example",
          content: "This is an example of a note",
          userId: 1,
          notebookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "This is a note",
          content: "Note",
          userId: 1,
          notebookId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Note",
          content: "Note example",
          userId: 2,
          notebookId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "This is an example of a note",
          content: "Notes Example",
          userId: 2,
          notebookId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Notes",
      {
        id: { [Sequelize.Op.gt]: 0 },
      },
      {}
    );
  },
};

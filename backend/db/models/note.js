'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    notebookId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, { foreignKey: 'userId' });
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
  };
  return Note;
};

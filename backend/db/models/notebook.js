'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, { foreignKey: 'userId',});
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId', onDelete: "CASCADE", hooks:true });
  };
  return Notebook;
};

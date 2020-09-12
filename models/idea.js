const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../util/database');

const Idea = sequelize.define('idea', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    description: DataTypes.STRING,
    diary: DataTypes.STRING
});

module.exports = Idea;
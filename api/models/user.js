'use strict';

const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model { }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A firstName is required.',
        },
        notEmpty: {
          msg: 'Please provide a value for "firstName".',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A lastName is required.',
        },
        notEmpty: {
          msg: 'Please provide a value for "lastName".'
        },
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Sorry! The email address you provided is already in use.',
      },
      validate: {
        notNull: {
          msg: 'An email is required.',
        },
        isEmail: {
          msg: 'Please provide a value for "emailAddress".',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required.'
        },
        notEmpty: {
          msg: 'Please provide a value for "password".',
        },
        len: {
          args: [8, 20],
          msg: 'Password must be between 8 and 20 characters in length.',
        },
      },
    },
  }, { sequelize });

  User.addHook('beforeCreate', (user) => {
    if (user.password) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      user.password = hashedPassword;
    }
  });

  User.addHook('beforeSave', (user) => {
    if (user.password) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      user.password = hashedPassword;
    }
  });

  // Create data relationship between User and Course
  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
      }
    })
  }

  return User;
};
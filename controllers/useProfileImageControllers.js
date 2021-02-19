const fs = require("fs");
const sequelize = require('./../models/index')
const userProfileImageModel = require('../models/user-profile-image-models');
const { emitWarning } = require("process");
const UserMouserProfileSeq = userProfileImageModel(sequelize.sequelize, sequelize.Sequelize.DataTypes)

const userProfileImageControllers = {

  uploadUserProfileImage: (req, res) => {

    UserMouserProfileSeq.create({
      user_id: req.body.user_id,
      profile_pic_url: req.body.imageUrl,
      email: req.body.email
    })
      .then((response) => {
        res.statueCode = 201;
        res.json({
          success: true,
          message: "upload is successful",
        });
      })
      .catch((err) => {
        res.statueCode = 409;
        res.json({
          success: false,
          message: "unable to upload due to unexpected error",
        });
      });
  },

  getUserProfileImage: (req, res) => {

    UserMouserProfileSeq.findOne({
      where: {
        email: res.locals.jwtData.email
      }
    })
      .then(userResults => {
        if (userResults) { }
        res.json(userResults)
      })
      .catch(err => {
        res.json(err)
      })

  },

  deleteProfileImage: (req, res) => {

    UserMouserProfileSeq.destroy({
      where: {
        email: res.locals.jwtData.email
      }
    })
    .then(userResults => {
      if (userResults) { }
      res.json(userResults)
    })
    .catch(err => {
      res.json(err)
    })
  },
}


module.exports = userProfileImageControllers
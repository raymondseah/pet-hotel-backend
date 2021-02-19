const fs = require("fs");
const sequelize = require('./../models/index')
const petProfileImageModel  =require('./../models/pet-image-models')
const { emitWarning } = require("process");
const { request } = require("http");
const PetProfileSeq = petProfileImageModel(sequelize.sequelize, sequelize.Sequelize.DataTypes)

const petImageControllers ={

  uploadPetProfileImage: (req, res) => {

    console.log(req.body)

    PetProfileSeq.create({
      user_id: req.body.user_id,
      profile_pic_url: req.body.pet_profile_url,
      email: req.body.email,
      pet_id:req.body.pet_id
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

  getPetProfileImageById: (req, res) => {
    let id = req.params.id
    PetProfileSeq.findOne({
      where: {
        pet_id: id
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

  deletePetProfileImage: (req, res) => {
    let id = req.params.id
    PetProfileSeq.destroy({
      where: {
        pet_id: id
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

module.exports = petImageControllers
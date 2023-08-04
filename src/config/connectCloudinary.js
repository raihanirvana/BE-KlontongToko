const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dej8k1hyr",
  api_key: "579721756547947",
  api_secret: "spwj0LOg_0uSrgz1Rsp3cTJ9Lpo",
  secure: true,
});

module.exports = cloudinary;

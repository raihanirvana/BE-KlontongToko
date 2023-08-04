const cloudinary = require("../config/connectCloudinary");
const path = require("path");
const dataUriParser = require("datauri/parser");

const uploader = async (file, prefix) => {
  if (!file) return { secure_url: null };
  const buffer = file.buffer;
  const ext = path.extname(file.originalname).toString();
  const parser = new dataUriParser();
  const datauri = parser.format(ext, buffer);
  const timestamp = Date.now();
  const filename = `${prefix}-${file.fieldname}-${timestamp}`;
  try {
    const result = await cloudinary.uploader.upload(datauri.content, {
      public_id: filename,
      folder: "KlontongImage",
    });
    return { secure_url: result.secure_url };
  } catch (err) {
    return { secure_url: null };
  }
};

module.exports = { uploader };

const { uploader } = require("../utils/cloudinary");
const cloudUpload = async (req, res, next) => {
  try {
    const { file } = req;

    if (file) {
      const { secure_url } = await uploader(file, "Products");
      if (!secure_url) {
        throw new Error("Error uploading file to cloud");
      }
      req.uploadResult = secure_url;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { cloudUpload };

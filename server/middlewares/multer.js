import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  console.log("file :>> ", file);
  let extension = path.extname(file.originalname);
  if (extension !== ".jpg" && extension !== ".png" && extension !== ".jpeg") {
    console.log("upload not allowed");
    // To reject this file pass `false`, like so:
    cb(null, false);
  } else {
    console.log("upload accepted");
    // To accept the file pass `true`, like so:
    cb(null, true);
  }
};

const multerUpload = multer({ storage: storage, fileFilter });

export default multerUpload;

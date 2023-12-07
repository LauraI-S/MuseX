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

  //   // You can always pass an error if something goes wrong:
  //   cb(new Error("I don't have a clue!"));
};

// const fileFilter = (req, file, cb) => {
//   // The function should call `cb` with a boolean
//   // to indicate if the file should be accepted
//   let extension = path.extname("index.html");
//   if (extension !== ".jpg" && extension !== ".png" && extension !== ".jpeg") {
//     console.log("upload not allowed");
//     // To reject this file pass `false`, like so:
//     cb(null, false);
//   } else {
//     console.log("upload excepted");
//     // To accept the file pass `true`, like so:
//     cb(null, true);
//   }
//   //   // You can always pass an error if something goes wrong:
//   //   cb(new Error("I don't have a clue!"))
// };

const multerUpload = multer({ storage, fileFilter });

export default multerUpload;

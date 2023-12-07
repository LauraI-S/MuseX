import musicianModel from "../Model/musicianModel.js";

//!Controllerfunction:
const getAllMusicians = async (req, res) => {
  try {
    const musicians = await musicianModel
      .find({})
      .populate({ path: "user", select: ["name", " _id"] });

    if (musicians) {
      res.status(200).json({
        musicians: musicians,
        number: musicians.length,
      });
    } else {
      if (musicians.length === 0) {
        res.status(200).json({
          message: "Didn't find documents in the database",
        });
      }
    }
  } catch (err) {
    console.log("error :>> ", err);
    res.status(500).json({
      message: "An error occurred while fetching musicians",
      error: err.message,
    });
  }
};

const getMusiciansWithLikes = async (req, res) => {
  console.log("req :>> ".magenta, req.params.likes);
  const { likes } = req.params;
  console.log("likes :>> ", likes);
  if (req.params.likes) {
    try {
      const musiciansWithLikes = await musicianModel.find({
        likes: req.params.likes,
      });
      res.status(200).json({
        number: musiciansWithLikes.length,
      });
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        message: "something went wrong",
      });
    }
  }
};

// const getMusiciansByInstruments = async (req, res) => {
//   console.log("req :>> ".magenta, req.params.instrument);
//   const { instrument } = req.params; // Corrected variable name
//   console.log("instrument :>> ", instrument);
//   if (req.params.instrument) {
//     try {
//       const musiciansByInstruments = await musicianModel.find({
//         instrument: req.params.instrument, // Corrected parameter name
//       });
//       res.status(200).json({
//         string: musiciansByInstruments,
//       });
//     } catch (error) {
//       console.log("error :>> ", error);
//       res.status(500).json({
//         message: "something went wrong",
//       });
//     }
//   }
// };

// const getMusiciansByInstruments = async (req, res) => {
//   console.log("req :>> ".magenta, req.params.instrument);
//   const { instrument } = req.params;
//   console.log("instruments :>> ", instrument);
//   if (req.params.instrument) {
//     try {
//       const musiciansByInstruments = await musicianModel.find({
//         instrument: req.params.instrument,
//       });
//       res.status(200).json({
//         number: musiciansByInstruments.length,
//         musicians: musiciansByInstrument,
//       });
//     } catch (error) {
//       console.log("error :>> ", error);
//       res.status(500).json({
//         message: "something went wrong",
//       });
//     }
//   }
// };

export { getAllMusicians, getMusiciansWithLikes };

import musicianModel from "../Model/musicianModel.js";

const getAllMusicians = async (req, res) => {
  try {
    const musicians = await musicianModel
      .find({})
      .populate({ path: "user", select: ["username"] });

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
  console.log("req :>> ".magenta, req);
  const { likes } = req.query;
  console.log("likes :>> ", likes);
  if (req.query.likes) {
    try {
      const musiciansWithLikes = await musicianModel.find({
        likes: { $gte: req.query.likes },
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

export { getAllMusicians, getMusiciansWithLikes };

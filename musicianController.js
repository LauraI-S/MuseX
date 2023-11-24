import musicianModel from "../Model/musicianModel.js";

const getAllMusicians = async (req, res) => {
  try {
    const musicians = await musicianModel.find({});
    if (musicians) {
      return res.status(200).json({
        musicians: musicians,
        number: musicianModel.length,
      });
    }
  } catch (err) {
    return res.json({
      errorMessage: err,
    });
  }
};

export { getAllMusicians };

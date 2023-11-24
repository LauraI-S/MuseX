import userModel from "../Model/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users) {
      return res.status(200).json({
        users: users,
        user: users.length,
      });
    }
  } catch (err) {
    return res.json({
      errorMessage: err,
    });
  }
};

export { getAllUsers };

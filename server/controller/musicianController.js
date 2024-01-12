import MusicianModel from "../Model/musicianModel.js";

// Get all musicians
const getAllMusicians = async (req, res) => {
  try {
    const musicians = await MusicianModel.find();
    return res.status(200).json(musicians);
  } catch (error) {
    console.error("Error fetching musicians:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single musician by ID
const getMusicianDetails = async (req, res) => {
  try {
    const { _id } = req.params;
    const musician = await MusicianModel.findById(_id);

    if (!musician) {
      return res.status(404).json({ message: "Musician not found" });
    }

    return res.status(200).json(musician);
  } catch (error) {
    console.error("Error fetching musician details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createMusician = async (req, res) => {
  try {
    // Extract musician data from the request body
    const musicianData = req.body;

    // Create a new musician instance
    const newMusician = new MusicianModel(musicianData);

    // Save the musician to the database
    const savedMusician = await newMusician.save();

    return res.status(201).json(savedMusician);
  } catch (error) {
    console.error("Error creating musician:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a musician by ID
const updateMusician = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedMusicianData = req.body;

    const updatedMusician = await MusicianModel.findByIdAndUpdate(
      _id,
      updatedMusicianData,
      { new: true }
    ); // Updated the model name

    if (!updatedMusician) {
      return res.status(404).json({ message: "Musician not found" });
    }

    return res.status(200).json(updatedMusician);
  } catch (error) {
    console.error("Error updating musician:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a musician by ID
const deleteMusician = async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedMusician = await MusicianModel.findOneAndDelete({ _id: _id });

    if (!deletedMusician) {
      return res.status(404).json({ message: "Musician not found" });
    }

    return res.status(200).json({ message: "Musician deleted successfully" });
  } catch (error) {
    console.error("Error deleting musician:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAllMusicians,
  getMusicianDetails,
  updateMusician,
  createMusician,
  deleteMusician,
};

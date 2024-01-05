//each route gets a function, referencing the routes
import Request from "../Model/requestModel.js";
import mongoose from "mongoose";

// get all requests

const getRequests = async (req, res) => {
  const requests = await Request.find({}).sort({ createdAt: -1 });
  //this function finds all requests within the RequestModel and also sorts the requests
  //from the newest(-1=decending order) - newest one will be displayed on the top
  res.status(200).json(requests);
};

// get a single request
const getRequest = async (req, res) => {
  const { id } = req.params; // all routeparameters are stored in this property (params)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "there´s no such request" });
  }
  const request = await Request.findById(id);

  //if I don´t have this line of code then the code would just blindly run
  if (!request) {
    return res.status(404).json({ error: "No such request" });
  }
  res.status(200).json(request);
};

//create new request

const createRequest = async (req, res) => {
  const { occasion, location, genre, availability } = req.body;

  let emptyFields = [];

  if (!occasion) {
    emptyFields.push("occasion");
  }
  if (!location) {
    emptyFields.push("location");
  }
  if (!genre) {
    emptyFields.push("genre");
  }
  if (!availability) {
    emptyFields.push("availability");
  }
  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: "Please fill in all the fields first", emptyFields });

  //add doc to db
  try {
    const request = await Request.create({
      occasion,
      location,
      genre,
      availability,
    });
    res.status(200).json(request);
    // Query and log all requests after creating a new one
    const requests = await Request.find({});
    console.log(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a request
const deleteRequest = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "there is no such request" });
  }
  const request = await Request.findOneAndDelete({ _id: id });
  if (!request) {
    return res.status(404).json({ error: "No such request" });
  }

  res.status(200).json(request);
};

//update a request

const updateRequest = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "there is no such request" });
  }

  const request = await Request.findOneAndUpdate(
    { _id: id },
    {
      occasion: req.body.occasion,
      location: req.body.location,
      genre: req.body.genre,
      availability: req.body.availability,
    },
    { new: true }
  );
  if (!request) {
    return res.status(404).json({ error: "No such request" });
  }
  res.status(200).json(request);
};

export { createRequest, getRequests, getRequest, deleteRequest, updateRequest };

import mongoose from "mongoose";
import "dotenv/config";
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, enum: ["kgs", "lbs"], required: true },
  date: { type: String, required: true },
});

/**
 * Compile the model from the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

const createExercise = async (name, reps, weight, unit, date) => {
  const exercise = new Exercise({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  return exercise.save();
};

const findExercises = async (filter) => {
  const query = Exercise.find(filter);
  return query.exec();
};

const updateExercises = async (filter, update) => {
  try {
    const result = await Exercise.updateOne(filter, update);
    return result.modifiedCount;
  } catch (err) {
    throw "Error: 'Not found'";
  }
};

const deleteExercises = async (filter) => {
  const result = await Exercise.deleteOne(filter);
  return result.deletedCount;
};

//Database connection
const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createExercise, findExercises, updateExercises, deleteExercises };

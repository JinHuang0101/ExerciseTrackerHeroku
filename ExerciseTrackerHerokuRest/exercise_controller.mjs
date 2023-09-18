import "dotenv/config";
import * as exercises from "./exercise_model.mjs";
import express from "express";
import asyncHandler from "express-async-handler";
import expressValidator from "express-validator";

const PORT = process.env.PORT;

const app = express();

const { check, validationResult } = expressValidator;

app.use(express.json());

/**
 * Create using POST/exercises
 */
app.post(
  "/exercises",
  check("name").isString().notEmpty(),
  check("reps").isFloat({ min: 1 }),
  check("weight").isFloat({ min: 1 }),
  check("unit").isIn(["lbs", "kgs"]),
  check("date").custom((value) => {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(value);
  }),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Error: "Invalid request" });
    }

    exercises
      .createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((exercise) => {
        res.status(201).json(exercise);
      })
      .catch((error) => {
        res.status(400).json({ Error: "Invalid request" });
      });
  }
);

/**
 * Read all using GET/exercises
 */
app.get("/exercises", (req, res) => {
  exercises
    .findExercises()
    .then((exercise) => {
      res.status(200).json(exercise);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ Error: "Invalid request" });
    });
});

/**
 * Read one using GET/exercises/:_id
 */
app.get("/exercises/:_id", (req, res) => {
  const filter = {};
  if (req.params._id !== undefined) {
    filter._id = req.params._id;
  }

  exercises
    .findExercises(filter)
    .then((exercise) => {
      if (Object.keys(exercise).length === 0) {
        res.status(404).json({ Error: "Not found" });
      } else {
        res.status(200).json(exercise);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ Error: "Invalid request" });
    });
});

/**
 * Update using PUT/exercises/:_id
 */
app.put(
  "/exercises/:_id",
  check("name").notEmpty(),
  check("reps").isFloat({ min: 1 }),
  check("weight").isFloat({ min: 1 }),
  check("unit").isIn(["lbs", "kgs"]),
  check("date").custom((value) => {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(value);
  }),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ Error: "Invalid request" });
    }

    const update = {};

    update.name = req.body.name;
    update.reps = req.body.reps;
    update.weight = req.body.weight;
    update.unit = req.body.unit;
    update.date = req.body.date;

    //check if the id exists first, if not, throw exception
    exercises
      .findExercises({ _id: req.params._id })
      .then((exercise) => {
        if (Object.keys(exercise).length === 0) {
          res.status(404).json({ Error: "Not found" });
        } else {
          exercises
            .updateExercises({ _id: req.params._id }, update)
            .then((resultVal) => {
              res.json({
                _id: req.params._id,
                name: req.body.name,
                reps: req.body.reps,
                weight: req.body.weight,
                unit: req.body.unit,
                date: req.body.date,
              });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ Error: "Invalid request" });
      });
  }
);

/**
 * DELETE using DELETE/exercises/:_id
 */
app.delete("/exercises/:_id", (req, res) => {
  exercises
    .deleteExercises({ _id: req.params._id })
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send({ Error: "Not found" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

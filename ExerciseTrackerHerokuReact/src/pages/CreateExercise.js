import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../App.css";

function CreateExercise() {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const addExercise = async (e) => {
    const newExercise = { name, reps, weight, unit, date };

    const response = await fetch("/exercises", {
      method: "POST",
      body: JSON.stringify(newExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      alert("Successfuly added the exercise");
    } else {
      alert(`Failed to add exercise, status code = ${response.status}`);
    }
    navigate("/");
  };

  return (
    <div>
      <div className="createDescription">
        <h2>Create Exercise</h2>
        <p>Enter a new exercise record.</p>
      </div>

      <div className="createInput">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <select name="unit" onChange={(e) => setUnit(e.target.value)}>
          <option value="">Please Select Unit</option>
          <option value="lbs">lbs</option>
          <option value="kgs">kgs</option>
        </select>

        <input
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addExercise}>Add</button>
      </div>
    </div>
  );
}

export default CreateExercise;

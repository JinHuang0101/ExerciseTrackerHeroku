import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function EditExercise({ exerciseToEdit }) {
  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const navigate = useNavigate();

  const editExercise = async () => {
    const editedExercise = { name, reps, weight, unit, date };

    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: "PUT",
      body: JSON.stringify(editedExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Successfully edited the exercise");
    } else {
      alert(`Failed to edit exercise, status code = ${response.status}`);
    }
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Exercise</h2>
      <p>Update an existing record.</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <select
        name="unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="">Please Select</option>
        <option value="lbs">lbs</option>
        <option value="kgs">kgs</option>
      </select>

      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={editExercise}>Save Edits</button>
    </div>
  );
}

export default EditExercise;

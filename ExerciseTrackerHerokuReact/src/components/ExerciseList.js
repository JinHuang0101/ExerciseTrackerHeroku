import React from "react";
import Exercises from "./Exercises";
import "../App.css";

function ExerciseList({ exercises, onDelete, onEdit }) {
  return (
    <table className="tableFixHead" id="exercises">
      <thead>
        <tr>
          <th width="35%">Name</th>
          <th width="10%">Reps</th>
          <th width="10%">Weight</th>
          <th width="10%">Unit</th>
          <th width="20%">Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise, i) => (
          <Exercises
            exercise={exercise}
            onDelete={onDelete}
            onEdit={onEdit}
            key={i}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ExerciseList;

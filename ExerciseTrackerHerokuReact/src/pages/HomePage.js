import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import ExerciseList from "../components/ExerciseList";
import "../App.css";

function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  const onDelete = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      const newExercises = exercises.filter((data) => data._id !== _id);
      setExercises(newExercises);
    } else {
      console.error(
        `Failed to delete exercise with _id=${_id}, status code = ${response.status}`
      );
    }
  };

  const onEdit = (exercise) => {
    setExerciseToEdit(exercise);
    navigate("edit-exercise");
  };

  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const data = await response.json();
    setExercises(data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <>
      <div className="homeDescription">
        <h2>Keep Fit Home</h2>
        <p className="homeUl">
          Scroll down for a complete list of exercise records. Click on edit to
          modify an entry. Click on delete to remove an entry.
        </p>
      </div>
      <ExerciseList
        exercises={exercises}
        onDelete={onDelete}
        onEdit={onEdit}
      ></ExerciseList>
    </>
  );
}

export default HomePage;

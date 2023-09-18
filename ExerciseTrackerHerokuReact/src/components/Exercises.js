import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { MdDeleteForever, MdEditNote } from "react-icons/md";

function Exercises({ exercise, onDelete, onEdit }) {
  return (
    <tr id="trHighlight">
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <MdEditNote className="editNote" onClick={() => onEdit(exercise)} />
      </td>
      <td>
        <MdDeleteForever
          className="deleteForever"
          onClick={() => onDelete(exercise._id)}
        />
      </td>
    </tr>
  );
}

export default Exercises;

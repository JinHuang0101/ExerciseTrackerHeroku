import "./App.css";
import Navigation from "./components/Navigation";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditExercise from "./pages/EditExercise";
import CreateExercise from "./pages/CreateExercise";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <body className="App-body">
        <Router>
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={<HomePage setExerciseToEdit={setExerciseToEdit} />}
            ></Route>
            <Route
              path="/edit-exercise"
              element={<EditExercise exerciseToEdit={exerciseToEdit} />}
            ></Route>
            <Route path="/create-exercise" element={<CreateExercise />}></Route>
          </Routes>
        </Router>
      </body>

      <Footer />
    </div>
  );
}

export default App;

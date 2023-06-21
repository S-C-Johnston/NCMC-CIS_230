/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import './App.css';
import { Weight_workout_Form } from './Weight_workout_Form';
import { Weight_workout } from './Workout';
import { WEIGHT_UNITS, Weight } from './Weight';

function App() {

  let example_workout = new Weight_workout(5, 5, {quantity: 25, weight_unit: WEIGHT_UNITS.Kilograms} as Weight, "Arnold Press");

  return (
    <div className="App">
      <Weight_workout_Form current_workout={example_workout}/>
    </div>
  );
}

export default App;

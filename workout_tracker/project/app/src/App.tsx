/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { Weight_workout_Form } from './Weight_workout_Form';
import { Weight_workout } from './Workout';
import { WEIGHT_UNITS, Weight } from './Weight';
import { initialize_Workout_Database, workout_db_schema } from './Workout_Database';
import { IDBPDatabase } from "idb"

function App() {
  const workout_db = useRef<IDBPDatabase<workout_db_schema> | null>(null);

  useEffect( () => {
    (async () => {
    workout_db.current = await initialize_Workout_Database()
      // .then(promise => { return promise })
    })()
  }, [])

  // let example_workout = new Weight_workout({
  //   sets: 5,
  //   repetitions: 5,
  //   weight: {
  //     quantity: 25,
  //     weight_unit: WEIGHT_UNITS.Kilograms
  //   } as Weight,
  //   exercise_name: "Arnold Press"
  // });

  return (
    <div className="App">
      <Weight_workout_Form />
    </div>
  );
}

export default App;

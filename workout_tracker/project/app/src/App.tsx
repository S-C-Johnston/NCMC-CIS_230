/* eslint-disable react/jsx-pascal-case */
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Weight_workout_Form } from './Weight_workout_Form';
import { initialize_Workout_Database, workout_db_schema } from './Workout_Database';
import { IDBPDatabase } from "idb"

function App() {
  const workout_db = useRef<IDBPDatabase<workout_db_schema> | null>(null);
  const [database_attached, set_database_attached] = useState(false);

  useEffect(() => {
    (async () => {
      workout_db.current = await initialize_Workout_Database()
      // .then(promise => { return promise })
      return set_database_attached(true)
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
      {database_attached ?
        <Weight_workout_Form database_handle={(workout_db.current) as IDBPDatabase<workout_db_schema>} />
        : <p>Loading database...</p>
      }
    </div>
  );
}

export default App;

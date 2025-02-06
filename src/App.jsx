import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './component/Hero'
import Navbar from './component/Navbar'
import Symptom_Prediction from './component/Symptom_Prediction'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      < Symptom_Prediction></Symptom_Prediction>
      <footer className="bg-gray-800 text-white text-center p-4 mt-10">
        <p className="text-sm">&copy; {new Date().getFullYear()} Health Advisor. All rights reserved.</p>
      </footer>

      {/* <div class="container">
        <h2>Symptom-Based Disease Prediction</h2>
        <p>Enter your symptoms to check possible diseases.</p>

        <label for="symptom1">Select Symptom 1:</label>
        <select id="symptom1">
            <option value="">-- Select --</option>
            <option value="fever">Fever</option>
            <option value="cough">Cough</option>
            <option value="fatigue">Fatigue</option>
            <option value="headache">Headache</option>
        </select>

        <label for="symptom2">Select Symptom 2:</label>
        <select id="symptom2">
            <option value="">-- Select --</option>
            <option value="fever">Fever</option>
            <option value="cough">Cough</option>
            <option value="fatigue">Fatigue</option>
            <option value="headache">Headache</option>
        </select>

        <button onclick="predictDisease()">Predict Disease</button>

        <h3>Predicted Disease:</h3>
        <p id="result">Awaiting input...</p>
    </div> */}

    </>
  )
}

export default App

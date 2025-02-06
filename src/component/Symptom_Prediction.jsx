import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

function SymptomPrediction() {
  const [symptom, setSymptom] = useState(""); // User input for symptoms
  const [result, setResult] = useState(""); // Prediction result
  const [loading, setLoading] = useState(false); // Loading state while predicting
  const [model, setModel] = useState(null); // Store the model
  const [diseasesData, setDiseasesData] = useState([]); // Store diseases data
  const [error, setError] = useState(""); // Error message

  // Load the model and disease data when the component mounts
  useEffect(() => {
    async function loadModel() {
      try {
        // Load a pre-trained model or replace it with your own disease prediction model
        const loadedModel = await tf.loadLayersModel(
          "https://storage.googleapis.com/tfjs-models/tfjs/iris_v1/model.json"
        );
        setModel(loadedModel);
        console.log("Model loaded successfully!");

        // Load disease data from a local JSON file
        const response = await fetch("/symptomsData.json");
        const data = await response.json();
        setDiseasesData(data.diseases);
      } catch (error) {
        console.error("Error loading model or disease data:", error);
        setError("Failed to load the AI model or disease data. Please try again later.");
      }
    }
    loadModel();
  }, []);

  const preprocessInput = (symptoms) => {
    // Preprocess symptoms to match the disease data structure
    const inputArray = diseasesData.map((disease) =>
      disease.symptoms.some((symptom) => symptoms.includes(symptom)) ? 1 : 0
    );
    return tf.tensor2d([inputArray]); // Return the input as a tensor
  };

  // Handle the prediction when the "Predict" button is clicked  
  const handlePredict = async () => {
    if (!model) {
      setResult("AI model is loading... Please wait.");
      return;
    }

    if (symptom.trim() === "") {
      setResult("Please enter symptoms to get a prediction.");
      return;
    }

    setLoading(true);

    try {
      // Split input by commas and preprocess the symptoms
      const symptomsArray = symptom.toLowerCase().split(",").map(sym => sym.trim());
      const inputTensor = preprocessInput(symptomsArray);

      // Make prediction
      const prediction = model.predict(inputTensor);
      const predictedValues = await prediction.data();

      // Find the disease with the highest probability
      const predictedDisease =
        diseasesData[predictedValues.indexOf(Math.max(...predictedValues))].name;

      setResult(`Possible Disease: ${predictedDisease}`);
    } catch (error) {
      console.error("Error making prediction:", error);
      setResult("An error occurred while making the prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center h-screen w-full">
      <div className="symptom_box bg-blue-50 p-6 px-10 rounded-2xl text-center w-full border-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Health Advisor - Symptom Prediction
        </h1>
        <p className="text-gray-600 mt-2">
          Enter your symptoms below to check possible diseases.
        </p>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mt-4 rounded-lg">
            <h3 className="font-semibold text-red-700">Error:</h3>
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="flex items-center mt-4 space-x-2">
          <input
            type="text"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="Enter symptoms (e.g., fever, cough)..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 bg-white focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handlePredict}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>

        {result && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mt-4 rounded-lg">
            <h3 className="font-semibold text-green-700">Prediction:</h3>
            <p className="text-green-800">{result}</p>
          </div>
        )}
      </div>

      {/* Diagnosis Results Section */}
      <div className="img flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-20">
        <img className="py-3 my-10 aspect-square w-32 md:w-auto" src="src/assets/patient.png" alt="patient illustration" />
        <div className="my-10 py-3 w-full max-w-lg">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Diagnosis Results</h2>
            <p className="text-gray-600 mb-3">Based on the symptoms provided, here are the possible conditions:</p>
            <ul className="list-disc pl-5 text-gray-700">
              <li><span className="font-semibold text-blue-600">Flu:</span> Common viral infection causing fever, cough.</li>
              <li><span className="font-semibold text-blue-600">Cold:</span> Mild viral infection with runny nose.</li>
              <li><span className="font-semibold text-blue-600">COVID-19:</span> Respiratory illness with fever and breathing difficulties.</li>
            </ul>
            <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              Get More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymptomPrediction;

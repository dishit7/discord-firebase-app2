'use client'
import { useState, useEffect } from "react";
import { patchUrlMappings } from "@discord/embedded-app-sdk";

const ToggleButton = () => {
  // Define the type explicitly for `toggleValue` and `error`
  const [toggleValue, setToggleValue] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Patch URL mappings for Firebase
    patchUrlMappings([{ prefix: '/firebase', target: 'https://temp-9204f-default-rtdb.firebaseio.com' }]);
    fetchToggleValue();  // Fetch initial value when component mounts
  }, []);

  // Fetch the current toggle value
  const fetchToggleValue = async () => {
    try {
      const response = await fetch('/firebase/toggle.json');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setToggleValue(data);  // Set the current toggle value
    } catch (error: any) {
      setError(error.message);
      console.error(error);  // Log error if any
    }
  };

  // Toggle the current value by updating it in Firebase
  const updateToggleValue = async () => {
    try {
      const newValue = !toggleValue;  // Toggle the value
      const response = await fetch('/firebase/toggle.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newValue),
      });

      if (!response.ok) throw new Error('Failed to update data');
      setToggleValue(newValue);  // Update the toggle value locally
    } catch (error: any) {
      setError(error.message);
      console.error(error);  // Log error if any
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg max-w-sm w-full text-center">
        <button
          onClick={updateToggleValue}
          className="px-6 py-3 mb-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition duration-200"
        >
          Toggle Value
        </button>

        {toggleValue !== null && (
          <div className="text-xl font-medium">
            <p>
              Current Toggle Value:{" "}
              <span className={toggleValue ? "text-green-400" : "text-red-400"}>
                {toggleValue ? "True" : "False"}
              </span>
            </p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-500 text-sm">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default ToggleButton;

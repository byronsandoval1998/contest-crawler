import React, { useState } from 'react';

const UpdateConcursosButton = ({onUpdate}) => {
  const [showConcursos, setShowConcursos] = useState(false); // State to control whether to show the Contests component

  const handleButtonClick = async () => {
    try {
      const pythonScriptPath = '/Users/Byron/Desktop/contest-crawler/contests/scripts/scraper.py';

      const response = await fetch('/api/executePythonScript', {
        method: 'POST',
        body: JSON.stringify({ pythonScriptPath }), // Pass the Python script path in the request body
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("Updated Concursos.")
        // Log the response message
        onUpdate();
      } else {
        console.error('Error executing Python script.');
      }
    } catch (error) {
      console.error('Error executing Python script:', error);
    }
  };

  return (
                <div className="m-20">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleButtonClick}>
        Actualizar la lista de Concursos
      </button>
     
      
    </div>
  );
};

export default UpdateConcursosButton;
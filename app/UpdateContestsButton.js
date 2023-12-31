import React, { useState } from 'react';

const UpdateContestsButton = ({onClick}) => {
  const handleButtonClick = async () => {
    try {
      const pythonScriptPath = '/Users/Byron/Desktop/contest-crawler/contests/scripts/crawl.py';

      const response = await fetch('/api/executePythonScript', {
        method: 'POST',
        body: JSON.stringify({ pythonScriptPath }), // Pass the Python script path in the request body
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        
        console.log("Data has been updated.")
        onClick();
        // Log the response message
      } else {
        console.error('Error executing Python script.');
      }
    } catch (error) {
      console.error('Error executing Python script:', error);
    }
  };

  return (
    <div class="m-20">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleButtonClick}>
        Update Contests List
      </button>
      
    </div>
  );
};

export default UpdateContestsButton;
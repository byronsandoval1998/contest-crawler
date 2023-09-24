import React, { useState, useEffect } from 'react';

const UpdateFavoritesButton = ({onFavoriteAdded}) => {
   // State to control whether to show the Contests component
  
  const handleButtonClick = async () => {
    try {
      // Replace with the actual path to your Python script
      const pythonScriptPath = '/Users/Byron/Desktop/contest-crawler/contests/scripts/fav.py';

      const response = await fetch('/api/executePythonScript', {
        method: 'POST',
        body: JSON.stringify({ pythonScriptPath }), // Pass the Python script path in the request body
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("Python script ran successfully.");
        // Log the response message
        onFavoriteAdded();
        
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
        Update Favorites List
      </button>
    </div>
  );
};

export default UpdateFavoritesButton;

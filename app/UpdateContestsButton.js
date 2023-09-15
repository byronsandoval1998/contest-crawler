import React, { useState } from 'react';
import Contests from './Contests';

const UpdateContestsButton = () => {
  const [showContests, setShowContests] = useState(false); // State to control whether to show the Contests component

  const handleButtonClick = async () => {
    try {
      const response = await fetch('/api/executePythonScript', {
        method: 'POST', 
      });

      if (response.ok) {
        console.log('Python script executed successfully.');
        // Update the state to show the Contests component
        setShowContests(true);
      } else {
        console.error('Error executing Python script.');
      }
    } catch (error) {
      console.error('Error executing Python script:', error);
    }
  };

  return (
    <div class="">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleButtonClick}>
        Update Contests List
      </button>
      {showContests && <Contests />} {/* Conditionally render Contests */}
    </div>
  );
};

export default UpdateContestsButton;

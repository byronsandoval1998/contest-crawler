import React, { useState } from 'react';
import Concursos from './Concursos';

const UpdateConcursosButton = () => {
  const [showConcursos, setShowConcursos] = useState(false); // State to control whether to show the Contests component

  const handleButtonClick = async () => {
    try {
      const response = await fetch('/api/executeScrapper', {
        method: 'POST', 
      });

      if (response.ok) {
        console.log('Python script executed successfully.');
        // Update the state to show the Contests component
        setShowConcursos(true);
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
        Actualizar la lista de Concursos
      </button>
      {showConcursos && <Concursos />} {/* Conditionally render Contests */}
      <button
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        class="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
          </svg>
      </button>
    </div>
  );
};

export default UpdateConcursosButton;
//add a call to fetch the data so the call doesnt stalled for the db
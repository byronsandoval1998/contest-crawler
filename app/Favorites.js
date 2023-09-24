import React, { useEffect, useState } from 'react';


const Favorites = () => {
    const [data, setData] = useState([]);
    let d = []
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/db/fetchFav');
          const jsonData = await response.json();
          // Format the date to remove the timestamp
          const formattedData = jsonData.map((item) => ({
              ...item,
              pdate: formatDate(item.pdate),
            }));

            formattedData.sort((a, b) => new Date(a.pdate) - new Date(b.pdate));
    
          setData(formattedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    // Function to format the date as 'YYYY-MM-DD'
    const formatDate = (datetimeString) => {
      const date = new Date(datetimeString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };


    const handleDelete = async (item) => {
      try {
        // Send a DELETE request to delete the favorite
        const response = await fetch('/api/db/deleteFav', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: item.user_id,
          }),
        });
    
        // Handle the response as needed
        if (response.ok) {
          console.log('Success: The item was deleted from favorites');
          // Update the state to remove the deleted item
          setData((prevData) => prevData.filter((favItem) => favItem.user_id !== item.user_id));
        } else {
          // Handle errors, e.g., show an error message to the user
          console.error('Error deleting from favorites');
        }
      } catch (error) {
        console.error('Could not delete:', error);
      }
    };
    
    
    return (
      <div>
        <h1 class="m-8 font-semibold text-xl tracking-tight">Favorites</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id} class="mb-4"><a href={item.link} target="_blank">{item.title}</a>
            <p class="text-gray-400">Deadline: {item.pdate}</p>
            <button
            onClick={() => handleDelete(item)}
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            class="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg>
            </button>
            </li>
            
          ))}
                  
        </ul>
      </div>
    );
  };
  
  export default Favorites;
import React, { useEffect, useState } from 'react';

const Contests = ({keyProp, onFavoriteAdded}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/db/fetchSecondData');
        const jsonData = await response.json();

        jsonData.sort((a,b) => b.release - a.release)
        
        // Format the date to remove the timestamp
        const formattedData = jsonData.map((item) => ({
          ...item,
          release: formatDate(item.release),
        }));

      formattedData.sort((a, b) => new Date(a.release) - new Date(b.release));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [keyProp]);

  // Function to format the date as 'YYYY-MM-DD'
  const formatDate = (datetimeString) => {
    const date = new Date(datetimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleButtonClick = async (item) => {
    try {
      const formattedDate = new Date(item.release).toISOString();
      const response = await fetch('/api/db/postFav', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: item.id,
          title: item.title,
          pdate: formattedDate,
          link: item.link,
        }),
      });
  
      // Handle the response as needed
      if (response.ok) {
        console.log('Success: The item was added to favorites');
        setData((prevData) => prevData.filter((ContestItem) => ContestItem.id !== item.id));
        onFavoriteAdded();
      } else {
        // Handle errors, e.g., show an error message to the user
        console.error('Error adding to favorites');
      }
    } catch (error) {
      console.error('Could not add:', error);
    }
  };


  return (
    <div>
      <h1 class="font-semibold text-xl tracking-tight m-8">Contests</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id} class="mb-4">
            <a href={item.link} target="_blank" class="">{item.title}</a>
            <p class="text-gray-400">Deadline: {item.release}</p>
        <button
          onClick={() => handleButtonClick(item)}
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          class="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contests;

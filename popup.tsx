import { useState, useEffect} from "react";
import axios from 'axios';
import backgroundImage from "data-base64:~assets/back.jpg"; // Replace with the path to your background image
import { env } from 'node:process';

import "./style.css"


const IndexPopup = () => {
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [locationInfo, setLocationInfo] = useState(null);



  const handleClick = () => {
    setLoading(true);

    axios.get(`https://api.ipify.org?format=json`)
    .then((response) => {
      const userIpAddress = response.data.ip;
      setIpAddress(userIpAddress);
      // console.log(userIpAddress);

      axios.get(`https://ipinfo.io/${userIpAddress}?token=${process.env.PLASMO_PUBLIC_API_KEY}`)
      .then((locationResponse) => {
        
        const locationData = {
                country: locationResponse.data.country,
                city: locationResponse.data.city,
           };
           setLocationInfo(locationData);
        // console.log(locationResponse);
           setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching location:', error);
        setLoading(false);
      });
  });
};



  return (
    <div className="flex flex-col items-center border-box border-4 "
    style={{
               height:"500px",
               width:"500px",
               backgroundImage: `url(${backgroundImage})`, 
               backgroundSize: 'cover', 
               backgroundPosition: 'center', 
            
            }}
    >

      {locationInfo && (
        <h2 className=" mt-8 text-2xl text-center text-brown font-serif">
          Your country is {locationInfo.country} and city is {locationInfo.city}!!
        </h2>
      )}
      
      <button
        className={`bg-blue fixed h-20 w-64 mt-20 hover:bg-dark-blue text-white py-2 px-4 rounded font-serif text-2xl ${
          loading ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Show my location'}
      </button>

      
    </div>
  );
};


export default IndexPopup







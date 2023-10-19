import { useState, useEffect } from "react";
import PieChartData from "./PieChartData";

function UserData({type, time}){
    useEffect(() => {
      getUserData();
    }, [type, time])
    
    const [userData, setUserData] = useState("");

    const getUserData = async () => {
        const token = localStorage.getItem('access_token');

        if (type === 'Popularity' || type === 'Song Length'){
            // Fetching the user's top tracks in the appropriate time range
            const tracksUrl = 'https://api.spotify.com/v1/me/top/tracks?time_range=' + time;

            const {trackData} = fetch(tracksUrl, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('HTTP status ' + response.status);
                  }
                  return response.json();
                })
                .then(data => {
                  setUserData(data.items)
                })
                .catch(error => {
                  // Dealing with the access token expiring
                  localStorage.clear();
                  window.location.reload(false);
                  console.error('Error:', error);
                });
        }
        else if (type === 'Genre'){
            // Fetching the user's top artists in the appropriate time range
            const artistsUrl = 'https://api.spotify.com/v1/me/top/artists?limit=20&time_range=' + time;

            const {artistsData} = fetch(artistsUrl, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('HTTP status ' + response.status);
                  }
                  return response.json();
                })
                .then(data => {
                  setUserData(data.items)
                })
                .catch(error => {
                  // Dealing with the access token expiring
                  localStorage.clear();
                  window.location.reload(false);
                  console.error('Error:', error);
                });
        }
    }

    return (
        <div>
            <PieChartData userData={userData} dataType={type}></PieChartData>
        </div>
    )
}

export default UserData;

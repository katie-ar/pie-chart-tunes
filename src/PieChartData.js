import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import OtherList from "./OtherList";

function PieChartData({userData, dataType}){
    // Any time the data fetched from the API changes, the pie chart data will change to reflect that
    useEffect (() => {
        generateData();
    }, [userData])

    // The state variables storing the pie chart data and the list of genres classed as 'other'
    const [pieData, setPieData] = useState([]);
    const [otherList, setOtherList] = useState([]);

    // Generating the appropriate pie chart data
    const generateData = () => {
        var tempPieData = [];
        
        if (dataType === 'Popularity'){
            // How to generate the pie chart data if the user wants to find out about popularity
            tempPieData = [
                {'name': 'Niche', 'songCount': 0},
                {'name': 'Relatively known', 'songCount': 0},
                {'name': 'Popular', 'songCount': 0},
                {'name': 'Mega popular', 'songCount': 0}
            ];

            for (let i = 0; i < userData.length; i++){
                var popularity = userData[i].popularity;
                if (popularity > 75){
                  tempPieData[3]['songCount'] = tempPieData[3]['songCount'] + 1;
                }
                else if (popularity > 50){
                  tempPieData[2]['songCount'] = tempPieData[2]['songCount'] + 1;
                }
                else if (popularity > 25){
                  tempPieData[1]['songCount'] = tempPieData[1]['songCount'] + 1;
                }
                else {
                  tempPieData[0]['songCount'] = tempPieData[0]['songCount'] + 1;
                }
            }
            
            setPieData(tempPieData);
        }
        else if (dataType === 'Genre'){
            // How to generate the pie chart data if the user wants to find out about genre

            // Getting a list of all genres in the user's data
            var uniqueGenres = []
            for (let i = 0; i < userData.length; i++){
                for (let j = 0; j < userData[i].genres.length; j++){
                    var currentGenre = userData[i].genres[j];
                    if (uniqueGenres.includes(currentGenre) === false){
                        uniqueGenres.push(currentGenre);
                    }
                }
            }
            
            // Setting up all of the genres in the pie data
            for (let i = 0; i < uniqueGenres.length; i++){
                var newItem = {'name': uniqueGenres[i], 'songCount': 0};
                tempPieData.push(newItem);
            }

            // Counting the number of artists with each of the unique genres
            for (let i = 0; i < userData.length; i++){
                for (let j = 0; j < userData[i].genres.length; j++){
                    currentGenre = userData[i].genres[j];
                    var pos = 0;
                    for (let k = 0; k < uniqueGenres.length; k++){
                        if (currentGenre === uniqueGenres[k]){
                            pos = k;
                        }
                    }
                    tempPieData[pos]['songCount'] = tempPieData[pos]['songCount'] + 1;
                }
            }

            // Sorting pie data in descending order of song count
            tempPieData.sort((a, b) => {
                return b.songCount - a.songCount;
            });

            // Making it so only 10 genres are included then everything else is 'other'
            if (tempPieData.length > 10){
                var otherCount = 0;
                var tempOtherList = [];
                for (let i = 10; i < tempPieData.length; i++){
                    otherCount = otherCount + tempPieData[i]['songCount'];
                    tempOtherList.push(tempPieData[i]['name']);
                }
                setOtherList(tempOtherList);
                var tempDataForOther = [];
                for (let i = 0; i < 10; i++){
                    tempDataForOther.push(tempPieData[i]);
                }
                newItem = {'name':'other', 'songCount':otherCount};
                tempPieData = [];
                for (let i = 0; i < 10; i++){
                    tempPieData.push(tempDataForOther[i]);
                }
                tempPieData.push(newItem);
            }
            setPieData(tempPieData);
        }
        else if (dataType === 'Song Length'){
            // How to generate the pie chart data if the user wants to find out about song length
            tempPieData = [
                {'name': '< 1 minute', 'songCount': 0},
                {'name': '1 - 3 minutes', 'songCount': 0},
                {'name': '3 - 5 minutes', 'songCount': 0},
                {'name': '5 - 10 minutes', 'songCount': 0},
                {'name': '> 10 minutes', 'songCount': 0}
            ];

            for (let i = 0; i < userData.length; i++){
                var songLength = userData[i].duration_ms;
                if (songLength < 60000){
                    tempPieData[0]['songCount'] = tempPieData[0]['songCount'] + 1;
                }
                else if (songLength < 180000){
                    tempPieData[1]['songCount'] = tempPieData[1]['songCount'] + 1;
                }
                else if (songLength < 300000){
                    tempPieData[2]['songCount'] = tempPieData[2]['songCount'] + 1;
                }
                else if (songLength < 600000){
                    tempPieData[3]['songCount'] = tempPieData[3]['songCount'] + 1;
                }
                else {
                    tempPieData[4]['songCount'] = tempPieData[4]['songCount'] + 1;
                }
            }

            setPieData(tempPieData);
        }
    }

    // The colours of the pie chart
    var colours = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#98f5e1" , "#9bf6ff","#a0c4ff", "#bdb2ff", "#ffc6ff", "#e0bfe0", "#fffffc"];

    // Displaying the pie chart with a legend
    return (
       <div>
        <ResponsiveContainer width="100%" height={350}>
        <PieChart>
                <Pie data={pieData}   dataKey='songCount'>
                {
                    pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colours[index % colours.length]}/>
                    ))
                  }
                </Pie>
                <Legend layout="horizontal"  formatter={(value, entry, index) => <span className="text-color-class">{value}</span>}/>
        </PieChart>
        </ResponsiveContainer>
        {dataType === 'Genre' ? <OtherList otherList={otherList}></OtherList>:<div></div>}
       </div> 
    )
}

export default PieChartData;

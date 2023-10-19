import { useState } from "react";
import styled from "styled-components";
import UserData from "./UserData";

// Styles the pie chart option buttons
const Button = styled.button`
  background-color: #5f7a57;
  color: white;
  font-size: 20px;
  padding: 10px 10px;
  border-radius: 20px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid black;
  @media screen and (max-width: 1000px) {
    font-size: 5vmin;
    width: 33%;
  } 
`;

// Styling the option buttons so it changes appearance when clicked on
const ButtonToggle = styled(Button)`
  opacity: 0.6;
  ${({ active }) =>
    active &&
    `
    opacity: 1;
  `}
`;

// Styling the whole group of option buttons
const ButtonGroup = styled.div`
  display: flex;
`;

function MainGroup(){
    const timeRangeOptions = [['short_term', '4 weeks'], ['medium_term', '6 months'], ['long_term', 'All Time']];
    const dataTypeOptions = ['Popularity', 'Genre', 'Song Length'];

    // The selectedTime and selectedType state variables are always updated to reflect what the user has clicked on
    const [selectedTime, setTime] = useState(timeRangeOptions[0][0]);
    const [selectedType, setType] = useState(dataTypeOptions[0]);

    // Displaying the option buttons
    return (
    <div>
      <div  class="option-group">
        <ButtonGroup>
            {timeRangeOptions.map(time => (
                <ButtonToggle class="option-button"
                key={time[0]}
                active={selectedTime === time[0]}
                onClick={() => setTime(time[0])}
                >
                {time[1]}
                </ButtonToggle>
            ))}
        </ButtonGroup>
        <ButtonGroup>
            {dataTypeOptions.map(type => (
                <ButtonToggle class="option-button"
                key={type}
                active={selectedType === type}
                onClick={() => setType(type)}
                >
                {type}
                </ButtonToggle>
            ))}
        </ButtonGroup>
        </div>
        <UserData type={selectedType} time={selectedTime}>
        </UserData>
    </div>
    )
}

export default MainGroup;
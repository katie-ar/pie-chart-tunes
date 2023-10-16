import styled from "styled-components";

const Button = styled.button`
  background-color: #5f7a57;
  color: white;
  font-size: 15px;
  padding: 10px 10px;
  border-radius: 20px;
  margin: 10px 5px 10px 5px;
  cursor: pointer;
  border: 1px solid black;
  width: fit-content;
  @media screen and (max-width: 1000px) {
    font-size: 5vmin;
    width: 95%;
  }
  
`;

export default Button;
import { useState, useEffect } from "react";
import Button from "./Button";

// Displays the list of 'other' genres when the user clicks the 'See other' button and hides them when the user clicks the 'Hide other' button
function OtherList({otherList}){
    // The state variable storing whether the 'other' list is to be displayed or not
    const [otherView, setOtherView] = useState(false);

    const handleOtherClick = (value) => {
        setOtherView(value);
    }
    
    // The 'other' list is hidden by default
    useEffect (() => {
        setOtherView(false);
    }, [otherList])
    
    // Displaying the 'other' list as well as the see/hide other button
    return (
        <div>
            {otherView === false ?<Button onClick={() => handleOtherClick(true)}>See other</Button>:
            <div>
            <Button onClick={() => handleOtherClick(false)}>Hide other</Button>
            <div class="other-list">
                {otherList.map((genre) =>
                    <p key={genre}>{genre}</p>
                )}
            </div>
            </div>}
        </div>
    )
}

export default OtherList;

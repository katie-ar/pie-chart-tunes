import { useState, useEffect } from "react"
import Button from "./Button"

// Displays the list of 'other' genres when the user clicks the 'See other' button and hides them when the user clicks the 'Hide other' button
function OtherList({otherList}){
    const [otherView, setOtherView] = useState(false)

    const handleOtherClick = (value) => {
        setOtherView(value)
    }
    
    // The 'other' list is hidden by default
    useEffect (() => {
        setOtherView(false);
    }, [otherList])
    
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

export default OtherList

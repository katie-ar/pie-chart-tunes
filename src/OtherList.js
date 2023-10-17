import { useState, useEffect } from "react"
import Button from "./Button"

function OtherList({otherList}){
    const [otherView, setOtherView] = useState(false)

    const handleOtherClick = (value) => {
        setOtherView(value)
    }

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

    /*return (
        <div class="other-list">
            {otherList.map((genre) =>
                <p key={genre}>{genre}</p>
            )}
        </div>
    )*/
}

export default OtherList
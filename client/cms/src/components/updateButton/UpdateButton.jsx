import "./updateButton.css"

export default function UpdateButton({handleFunction}) {
    console.log(handleFunction, "AAAA");
    
    return(
        <button className="update-button"
        onClick={handleFunction}>
            Update
        </button>
    )
}
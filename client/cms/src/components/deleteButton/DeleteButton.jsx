import "./deleteButton.css"

export default function DeleteButton({handleFunction}) {
    return(
        <button className="delete-button" onClick={handleFunction}>
            Delete
        </button>
    )
}
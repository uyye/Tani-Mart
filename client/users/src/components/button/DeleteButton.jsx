import "./button.css"

export default function DeleteButton({handleDelete}) {
    return(
        <button 
            className="delete-button"
            onClick={handleDelete}
        >
            Delete
        </button>
    )
}
const TodoItem = ({todo, onDelete}) => {
    return (
        <div>
            <p>
                {todo.title}
                <button onClick={() => onDelete(todo.id)}>Delete</button>
            </p>
        </div>
    )
}

export default TodoItem;
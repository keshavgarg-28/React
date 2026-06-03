function TaskRow({
    task,
    editingKey,
    editingName,
    editingStatus,
    statusOptions,
    getStatusLabel,
    editTask,
    setEditingName,
    setEditingStatus,
    saveTask,
    cancelEditing,
    deleteTask,
}) {
    const isEditing = editingKey === task.key;

    return (
        <tr>
            <td>{task.key}</td>
            <td>
                {isEditing ? (
                    <textarea
                        className="edit-input"
                        value={editingName}
                        onChange={(event) => setEditingName(event.target.value)}
                    />
                ) : (
                    <span className="task-name">{task.name}</span>
                )}
            </td>
            <td>
                {isEditing ? (
                    <select
                        className="edit-select"
                        value={editingStatus}
                        onChange={(event) => setEditingStatus(event.target.value)}
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span className={`status ${task.status}`}>
                        {getStatusLabel(task.status)}
                    </span>
                )}
            </td>
            <td>
                {isEditing ? (
                    <div className="row-actions">
                        <button
                            className="action-button save"
                            type="button"
                            onClick={() => saveTask(task.key)}
                        >
                            Save
                        </button>
                        <button
                            className="action-button ghost"
                            type="button"
                            onClick={cancelEditing}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div className="row-actions">
                        <button
                            className="action-button edit"
                            type="button"
                            onClick={() => editTask(task)}
                        >
                            Edit
                        </button>
                        <button
                            className="action-button delete"
                            type="button"
                            onClick={() => deleteTask(task.key)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}

export default TaskRow;

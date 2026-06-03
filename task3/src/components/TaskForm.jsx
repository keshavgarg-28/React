function TaskForm({
    taskName,
    taskStatus,
    statusOptions,
    setTaskName,
    setTaskStatus,
    addTask,
}) {
    return (
        <form className="add-task-form" onSubmit={addTask}>
            <input
                type="text"
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
                placeholder="Add task"
            />

            <select
                value={taskStatus}
                onChange={(event) => setTaskStatus(event.target.value)}
            >
                {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;

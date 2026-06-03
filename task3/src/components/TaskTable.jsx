import TaskRow from "./TaskRow.jsx";

function TaskTable({
    tasks,
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
    return (
        <div className="table-area">
            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskRow
                            editingKey={editingKey}
                            editingName={editingName}
                            editingStatus={editingStatus}
                            getStatusLabel={getStatusLabel}
                            key={task.key}
                            cancelEditing={cancelEditing}
                            deleteTask={deleteTask}
                            editTask={editTask}
                            saveTask={saveTask}
                            setEditingName={setEditingName}
                            setEditingStatus={setEditingStatus}
                            statusOptions={statusOptions}
                            task={task}
                        />
                    ))}
                </tbody>
            </table>

            {tasks.length === 0 && (
                <p className="empty-message">No tasks to show.</p>
            )}
        </div>
    );
}

export default TaskTable;

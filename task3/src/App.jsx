import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskHeader from "./components/TaskHeader.jsx";
import TaskTable from "./components/TaskTable.jsx";
import { filterTabs, statusOptions } from "./constants/taskOptions.js";

function App() {
    const [tasks, setTasks] = useState([]);
    const [nextTaskId, setNextTaskId] = useState(1);

    const [taskName, setTaskName] = useState("");
    const [taskStatus, setTaskStatus] = useState("todo");

    const [searchText, setSearchText] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    const [editingKey, setEditingKey] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [editingStatus, setEditingStatus] = useState("todo");

    const searchValue = searchText.toLowerCase();

    const filteredTasks = tasks.filter((task) => {
        const statusMatch = activeFilter === "all" || task.status === activeFilter;
        const nameMatch = task.name.toLowerCase().includes(searchValue);
        const keyMatch = String(task.key).includes(searchValue);

        return statusMatch && (nameMatch || keyMatch);
    });

    function addTask(event) {
        event.preventDefault();

        if (taskName.trim() === "") {
            return;
        }

        const newTask = {
            key: nextTaskId,
            name: taskName,
            status: taskStatus,
        };

        setTasks([...tasks, newTask]);
        setNextTaskId(nextTaskId + 1);
        setTaskName("");
        setTaskStatus("todo");
    }

    function editTask(task) {
        setEditingKey(task.key);
        setEditingName(task.name);
        setEditingStatus(task.status);
    }

    function cancelEditing() {
        setEditingKey(null);
        setEditingName("");
        setEditingStatus("todo");
    }

    function saveTask(taskKey) {
        if (editingName.trim() === "") {
            return;
        }

        const updatedTasks = tasks.map((task) => (
            task.key === taskKey
                ? { ...task, name: editingName, status: editingStatus }
                : task
        ));

        setTasks(updatedTasks);
        cancelEditing();
    }

    function deleteTask(taskKey) {
        setTasks(tasks.filter((task) => task.key !== taskKey));

        if (editingKey === taskKey) {
            cancelEditing();
        }
    }

    function getStatusLabel(status) {
        const selectedStatus = statusOptions.find((option) => option.value === status);
        return selectedStatus ? selectedStatus.label : status;
    }

    return (
        <main className="page">
            <section className="task-card">
                <TaskHeader
                    activeFilter={activeFilter}
                    filterTabs={filterTabs}
                    setActiveFilter={setActiveFilter}
                />

                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                />

                <TaskForm
                    addTask={addTask}
                    setTaskName={setTaskName}
                    setTaskStatus={setTaskStatus}
                    statusOptions={statusOptions}
                    taskName={taskName}
                    taskStatus={taskStatus}
                />

                <TaskTable
                    editingKey={editingKey}
                    editingName={editingName}
                    editingStatus={editingStatus}
                    editTask={editTask}
                    getStatusLabel={getStatusLabel}
                    cancelEditing={cancelEditing}
                    deleteTask={deleteTask}
                    saveTask={saveTask}
                    setEditingName={setEditingName}
                    setEditingStatus={setEditingStatus}
                    statusOptions={statusOptions}
                    tasks={filteredTasks}
                />
            </section>
        </main>
    );
}

export default App;

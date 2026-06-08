import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import Navbar from "./components/Navbar.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskHeader from "./components/TaskHeader.jsx";
import TaskTable from "./components/TaskTable.jsx";
import { filterTabs, statusOptions } from "./constants/taskOptions.js";

const currentProfileStorageKey = "task-manager-profile";
const userProfileStoragePrefix = "task-manager-user-profile-";
const userTasksStoragePrefix = "task-manager-user-tasks-";
const userSettingsStoragePrefix = "task-manager-user-settings-";

const defaultProfile = {
    firstName: "Keshav",
    lastName: "Garg",
    email: "",
    phone: "",
};

const defaultTaskState = {
    tasks: [],
    nextTaskId: 1,
};

const defaultUserSettings = {
    theme: "light",
};

function getProfileKey(profile) {
    return `${profile.firstName.trim()}-${profile.lastName.trim()}`
        .toLowerCase()
        .replace(/\s+/g, "-");
}

function getSavedProfile() {
    const savedProfile = localStorage.getItem(currentProfileStorageKey);

    if (!savedProfile) {
        return defaultProfile;
    }

    try {
        return JSON.parse(savedProfile);
    } catch {
        return defaultProfile;
    }
}

function getSavedUserProfile(profile) {
    const savedUserProfile = localStorage.getItem(`${userProfileStoragePrefix}${getProfileKey(profile)}`);

    if (!savedUserProfile) {
        return null;
    }

    try {
        return JSON.parse(savedUserProfile);
    } catch {
        return null;
    }
}

function getSavedTaskState(profile) {
    const savedTaskState = localStorage.getItem(`${userTasksStoragePrefix}${getProfileKey(profile)}`);

    if (!savedTaskState) {
        return defaultTaskState;
    }

    try {
        return JSON.parse(savedTaskState);
    } catch {
        return defaultTaskState;
    }
}

function getSavedUserSettings(profile) {
    const savedUserSettings = localStorage.getItem(`${userSettingsStoragePrefix}${getProfileKey(profile)}`);

    if (!savedUserSettings) {
        return defaultUserSettings;
    }

    try {
        return {
            ...defaultUserSettings,
            ...JSON.parse(savedUserSettings),
        };
    } catch {
        return defaultUserSettings;
    }
}

function saveTaskState(profile, tasks, nextTaskId) {
    localStorage.setItem(
        `${userTasksStoragePrefix}${getProfileKey(profile)}`,
        JSON.stringify({ tasks, nextTaskId })
    );
}

function saveUserSettings(profile, settings) {
    localStorage.setItem(
        `${userSettingsStoragePrefix}${getProfileKey(profile)}`,
        JSON.stringify(settings)
    );
}

function App() {
    const initialProfile = getSavedUserProfile(getSavedProfile()) || getSavedProfile();
    const initialTaskState = getSavedTaskState(initialProfile);
    const initialUserSettings = getSavedUserSettings(initialProfile);

    const [tasks, setTasks] = useState(initialTaskState.tasks);
    const [nextTaskId, setNextTaskId] = useState(initialTaskState.nextTaskId);
    const [theme, setTheme] = useState(initialUserSettings.theme);
    const [profile, setProfile] = useState(initialProfile);

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

        const updatedTasks = [...tasks, newTask];
        const updatedNextTaskId = nextTaskId + 1;

        setTasks(updatedTasks);
        setNextTaskId(updatedNextTaskId);
        saveTaskState(profile, updatedTasks, updatedNextTaskId);
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
        saveTaskState(profile, updatedTasks, nextTaskId);
        cancelEditing();
    }

    function deleteTask(taskKey) {
        const updatedTasks = tasks.filter((task) => task.key !== taskKey);

        setTasks(updatedTasks);
        saveTaskState(profile, updatedTasks, nextTaskId);

        if (editingKey === taskKey) {
            cancelEditing();
        }
    }

    function getStatusLabel(status) {
        const selectedStatus = statusOptions.find((option) => option.value === status);
        return selectedStatus ? selectedStatus.label : status;
    }

    function changeTheme() {
        const updatedTheme = theme === "light" ? "dark" : "light";

        setTheme(updatedTheme);
        saveUserSettings(profile, { theme: updatedTheme });
    }

    function saveProfile(updatedProfile) {
        const isSwitchingUser = getProfileKey(profile) !== getProfileKey(updatedProfile);
        const savedUserProfile = getSavedUserProfile(updatedProfile);
        const nextProfile = isSwitchingUser && savedUserProfile ? savedUserProfile : updatedProfile;
        const nextTaskState = getSavedTaskState(nextProfile);
        const nextUserSettings = getSavedUserSettings(nextProfile);

        localStorage.setItem(
            `${userProfileStoragePrefix}${getProfileKey(profile)}`,
            JSON.stringify(profile)
        );
        saveUserSettings(profile, { theme });
        setProfile(nextProfile);
        setTasks(nextTaskState.tasks);
        setNextTaskId(nextTaskState.nextTaskId);
        setTheme(nextUserSettings.theme);
        setSearchText("");
        setActiveFilter("all");
        cancelEditing();
        localStorage.setItem(currentProfileStorageKey, JSON.stringify(nextProfile));
        localStorage.setItem(
            `${userProfileStoragePrefix}${getProfileKey(nextProfile)}`,
            JSON.stringify(nextProfile)
        );
    }

    return (
        <div className={`app ${theme}`}>
            <Navbar
                theme={theme}
                changeTheme={changeTheme}
                profile={profile}
                saveProfile={saveProfile}
            />

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
        </div>
    );
}

export default App;

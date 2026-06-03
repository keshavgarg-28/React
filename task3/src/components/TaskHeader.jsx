function TaskHeader({ activeFilter, filterTabs, setActiveFilter }) {
    return (
        <header className="task-header">
            <h1>Tasks</h1>

            <div className="tabs" aria-label="Filter tasks by status">
                {filterTabs.map((tab) => (
                    <button
                        className={activeFilter === tab.value ? "tab active" : "tab"}
                        key={tab.value}
                        onClick={() => setActiveFilter(tab.value)}
                        type="button"
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </header>
    );
}

export default TaskHeader;

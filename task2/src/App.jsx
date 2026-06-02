import { useState } from "react";

function App() {
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState("");
    const [editIndex, setEditIndex] = useState(-1);

    function handleSubmit(e) {
        e.preventDefault();

        const trimmedEvent = eventName.trim();
        if (trimmedEvent === "") return;

        if (editIndex === -1) {
            setEvents([...events, trimmedEvent]);
        } else {
            setEvents(events.map((event, index) => (
                index === editIndex ? trimmedEvent : event
            )));
        }

        setEventName("");
        setEditIndex(-1);
    }

    function editEvent(index) {
        setEventName(events[index]);
        setEditIndex(index);
    }

    function deleteEvent(index) {
        setEvents(events.filter((_, eventIndex) => eventIndex !== index));

        if (editIndex === index) {
            setEventName("");
            setEditIndex(-1);
        }
    }

    return (
        <div className="app">
            <nav className="navbar">
                <div className="brand">
                    <div className="logo" aria-label="Event Manager logo">
                        E
                    </div>
                    <span>Event Manager</span>
                </div>
                <div className="user-name">Keshav Garg</div>
            </nav>

            <main className="page">
                <section className="container">
                    <h1>Event Manager</h1>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="Enter event name"
                        />
                        <button type="submit">
                            {editIndex === -1 ? "Add Event" : "Update Event"}
                        </button>
                    </form>

                    <ul>
                        {events.map((event, index) => (
                            <li key={`${event}-${index}`}>
                                <span>{event}</span>
                                <button type="button" onClick={() => editEvent(index)}>
                                    Edit
                                </button>
                                <button type="button" onClick={() => deleteEvent(index)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default App;

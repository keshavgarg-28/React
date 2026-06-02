let events = [];
let editIndex = -1;
const input = document.getElementById("eventInput");
const list = document.getElementById("eventList");
const button = document.getElementById("addBtn");
document.getElementById("eventForm").onsubmit = function (e) {
    e.preventDefault();
    if (input.value.trim() === "") return;
    if (editIndex === -1) events.push(input.value);
    else events[editIndex] = input.value;
    input.value = "";
    editIndex = -1;
    button.textContent = "Add Event";
    showEvents();
};
function showEvents() {
    list.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
        list.innerHTML += "<li><span>" + events[i] + "</span><button onclick='editEvent(" + i + ")'>Edit</button><button onclick='deleteEvent(" + i + ")'>Delete</button></li>";
    }
}
function editEvent(i) {
    input.value = events[i];
    editIndex = i;
    button.textContent = "Update Event";
}
function deleteEvent(i) {
    events.splice(i, 1);
    showEvents();
}
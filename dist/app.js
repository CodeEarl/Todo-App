var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
     
});



document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
    const lis = document.querySelectorAll(".lis");
    let draggedItem = null;

    lis.forEach((li) => {
        const bg = li.querySelector(".bg");
        const closeIcon = li.querySelector("svg");

        // Toggle the "completed" class and background when clicked
        bg.addEventListener('click', function () {
            li.classList.toggle("completed");
            bg.classList.toggle("bg-gradient");

            const check = bg.querySelector("span");
            check.classList.toggle("fa-check");
            updateItemCount(); // Update the item count after clicking
        });

        // Remove the item when the close icon is clicked
        closeIcon.addEventListener('click', function () {
            li.remove();
            updateItemCount(); // Update the item count after removal
        });

        // Add the drag-and-drop functionality
        li.draggable = true;

        li.addEventListener('dragstart', (e) => {
            draggedItem = li;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', null);
        });

        li.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        li.addEventListener('drop', (e) => {
            if (draggedItem) {
                const dropIndex = Array.from(todoList.children).indexOf(li);
                const dragIndex = Array.from(todoList.children).indexOf(draggedItem);

                if (dropIndex < dragIndex) {
                    todoList.insertBefore(draggedItem, li);
                } else {
                    todoList.insertBefore(draggedItem, li.nextSibling);
                }
            }

            draggedItem = null;
        });
    });

    const input = document.getElementById("text");

    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const text = input.value;

            if (text.trim() !== "") {
                const newItem = document.createElement("li");
                newItem.classList.add("lis", "p-3", "border-b", "border-gray-300", "dark:border-gray-700", "dark:text-gray-400", "flex", "items-center", "justify-between");
                const newBg = document.createElement("div");
                newBg.classList.add("bg", "cursor-pointer", "active:bg-gradient-to-br", "from-lg", "to-lg2", "w-5", "h-5", "rounded-full", "p-3", "border-2", "border-gray-700");
                const newSpan = document.createElement("span");
                newSpan.classList.add("fa-solid", "dash");
                const newH5 = document.createElement("h5");
                newH5.textContent = text;

                newBg.appendChild(newSpan);
                newItem.appendChild(newBg);
                newItem.appendChild(newH5);

                todoList.appendChild(newItem);

                input.value = "";
                updateItemCount(); // Update the item count after adding a new item
            }
        }
    });

    const clearFilterButton = document.getElementById("clear-filter-button");

    clearFilterButton.addEventListener('click', function () {
        lis.forEach((li) => {
            if (li.classList.contains("completed")) {
                li.remove(); // Remove completed items
            }
        });

        updateItemCount(); // Call this function to update the item count
    });

    function updateItemCount() {
        const activeTasks = document.querySelectorAll(".lis:not(.completed)").length;
        document.getElementById("number").textContent = `${activeTasks} ${activeTasks === 1 ? 'item' : 'items'} left`;

        const activeTasksFilter = document.querySelectorAll(".lis:not(.completed)").length;
        document.getElementById("number-filter").textContent = `${activeTasksFilter} ${activeTasksFilter === 1 ? 'item' : 'items'} left`;
    }

    const activeFilter = document.querySelector(".active-filter");
    const completedFilter = document.querySelector(".completed-filter");
    const allFilter = document.querySelector(".all-filter");

    activeFilter.addEventListener('click', function () {
        lis.forEach((li) => {
            if (li.classList.contains("completed")) {
                li.style.display = "none"; // Hide completed items
            } else {
                li.style.display = "flex"; // Show active items
            }
        });
        updateItemCount(); // Update the item count after filtering
    });

    completedFilter.addEventListener('click', function () {
        lis.forEach((li) => {
            if (li.classList.contains("completed")) {
                li.style.display = "flex"; // Show completed items
            } else {
                li.style.display = "none"; // Hide active items
            }
        });
        updateItemCount(); // Update the item count after filtering
    });

    allFilter.addEventListener('click', function () {
        lis.forEach((li) => {
            li.style.display = "flex"; // Show all items
        });
        updateItemCount(); // Update the item count after filtering
    });

    document.getElementById("clear-completed-button").addEventListener('click', function () {
        lis.forEach((li) => {
            if (li.classList.contains("completed")) {
                li.remove(); // Remove completed items
            }
        });
        updateItemCount(); // Update the item count after clearing completed items
    });
});

// Function to add IDs, classes, and unique class to elements based on visibility for a specific li
function addAttributesOnVisibility(entries, observer) {
    entries.forEach(entry => {
        const li = entry.target;
        const p = li.querySelector('p');
        const buttons = li.querySelectorAll('button');
        const lastButton = buttons[buttons.length - 1];

        if (entry.isIntersecting && li.id === 'comment-box') {
            // The specific li is now visible, add IDs, classes, and unique class to the elements
            p.id = 'number'; // Add an ID to the <p>
            lastButton.id = 'clear-filter-button'; // Add an ID to the last button

            buttons.forEach((button, index) => {
                // Add unique IDs to the first three buttons
                button.id = `button${index + 1}`;

                // Add different classes to the first three buttons
                if (index === 0) {
                    button.classList.add('all-filter'); // Add your first class name
                } else if (index === 1) {
                    button.classList.add('active-filter'); // Add your second class name
                } else if (index === 2) {
                    button.classList.add('completed-filter'); // Add your third class name
                }
            });
        }
    });
}

// Set up the Intersection Observer for the specific li
const liToObserve = document.querySelector('#comment-box');
const observer = new IntersectionObserver(addAttributesOnVisibility, {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: 0.1, // When at least 10% of the target is visible
});

observer.observe(liToObserve);

// Function to add a new todo item to the list and save it to local storage
function addTodoItem(itemText) {
    const todoList = JSON.parse(localStorage.getItem('todos')) || [];

    // Create a new todo item
    const todoItem = {
        id: new Date().getTime(), // Generate a unique ID (you can use any method)
        text: itemText,
        completed: false,
    };

    // Add the new item to the list
    todoList.push(todoItem);

    // Save the updated list to local storage
    localStorage.setItem('todos', JSON.stringify(todoList));

    // Update the todo list in the UI
    updateTodoList(todoList);
}
// Function to load todo list from local storage on page load
function loadTodoList() {
    const todoList = JSON.parse(localStorage.getItem('todos')) || [];
    updateTodoList(todoList);
}

// Call the loadTodoList function when the page loads
window.addEventListener('load', loadTodoList);

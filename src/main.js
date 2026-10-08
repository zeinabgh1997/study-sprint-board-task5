import './style.css';

// --------------------
// Storage
// --------------------

const STORAGE_KEY = "task4-study-board";

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// --------------------
// Initial Data
// --------------------

const sampleTasks = [
  {
    id: 1,
    title: "Practice DOM",
    subject: "JavaScript",
    priority: "high",
    status: "todo"
  },
  {
    id: 2,
    title: "Learn Array Methods",
    subject: "JavaScript",
    priority: "medium",
    status: "progress"
  },
  {
    id: 3,
    title: "Solve Algebra Exercises",
    subject: "Math",
    priority: "high",
    status: "todo"
  },
  {
    id: 4,
    title: "Review English Vocabulary",
    subject: "English",
    priority: "low",
    status: "done"
  },
  {
    id: 5,
    title: "Build a Calculator",
    subject: "JavaScript",
    priority: "high",
    status: "progress"
  },
  {
    id: 6,
    title: "Read Chapter 3",
    subject: "English",
    priority: "medium",
    status: "done"
  }
];

let tasks = [...sampleTasks];
let editingTaskId = null;

// --------------------
// Load Saved Tasks
// --------------------

const savedTasks = localStorage.getItem(STORAGE_KEY);

if (savedTasks) {
  try {
    tasks = JSON.parse(savedTasks);
  } catch (error) {
    console.log("Saved data is invalid.");
  }
}

// --------------------
// Update Statistics
// --------------------

function updateStats() {
  const total = tasks.length;

  const todoCount = tasks.filter(function (task) {
    return task.status === "todo";
  }).length;

  const progressCount = tasks.filter(function (task) {
    return task.status === "progress";
  }).length;

  const doneCount = tasks.filter(function (task) {
    return task.status === "done";
  }).length;

  const percentage =
    total === 0
      ? 0
      : Math.round((doneCount / total) * 100);

document.getElementById("stats-content").innerHTML = `
  <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
    
    <div class="bg-white rounded-xl p-3 border border-amber-200">
      <p class="text-sm text-gray-500">Total</p>
        <div class="border-t border-amber-100 my-2"></div>
      <p class="text-xl font-bold text-gray-900">${total}</p>
    </div>

    <div class="bg-white rounded-xl p-3 border border-amber-200">
      <p class="text-sm text-gray-500">To Do</p>
        <div class="border-t border-amber-100 my-2"></div>
      <p class="text-xl font-bold text-gray-900">${todoCount}</p>
    </div>

    <div class="bg-white rounded-xl p-3 border border-amber-200">
      <p class="text-sm text-gray-500">In Progress</p>
        <div class="border-t border-amber-100 my-2"></div>
      <p class="text-xl font-bold text-gray-900">${progressCount}</p>
    </div>

    <div class="bg-white rounded-xl p-3 border border-amber-200">
      <p class="text-sm text-gray-500">Done</p>
        <div class="border-t border-amber-100 my-2"></div>
      <p class="text-xl font-bold text-gray-900">${doneCount}</p>
    </div>

    <div class="bg-white rounded-xl p-3 border border-amber-200 ">
      <p class="text-sm text-gray-500">Progress</p>
        <div class="border-t border-amber-100 my-2"></div>
      <p class="text-xl font-bold text-gray-900">${percentage}%</p>
    </div>

  </div>
`;
}

// --------------------
// Render Board
// --------------------

function renderBoard(displayTasks = tasks) {
  let countTodo = 0;
  let countProgress = 0;
  let countDone = 0;

  document.getElementById("todo").innerHTML = "";
  document.getElementById("progress").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  for (let i = 0; i < displayTasks.length; i++) {
    const task = displayTasks[i];

    // --------------------
    // To Do
    // --------------------

    if (task.status === "todo") {
      countTodo++;

      const card = document.createElement("div");
      card.className =
        "bg-stone-50 border border-amber-200 rounded-xl p-4 mb-3 text-left shadow-sm";

      const title = document.createElement("h3");
      title.className = "text-lg font-bold text-amber-900 mb-2";
      title.textContent = task.title;

      const subject = document.createElement("p");
      subject.className = "text-sm text-gray-600 mb-1";
      subject.textContent = `📚 Subject: ${task.subject}`;

      const priority = document.createElement("p");
      priority.className = "text-sm text-gray-600";
      priority.textContent = `⭐ Priority: ${task.priority}`;

      const statusSelect = document.createElement("select");
      statusSelect.dataset.status = task.status;
      statusSelect.dataset.id = task.id;
      statusSelect.className =
        "task-status border rounded-lg p-2 mt-3 w-full focus:ring-2 focus:ring-amber-400";

      statusSelect.innerHTML = `
        <option value="todo">To Do</option>
        <option value="progress">In Progress</option>
        <option value="done">Done</option>
      `;

      const editButton = document.createElement("button");
      editButton.className =
        "edit-task bg-amber-400 text-white rounded-lg px-4 py-2  focus:ring-2 focus:ring-amber-400";
      editButton.dataset.id = task.id;
      editButton.textContent = "✨ Edit";

      const deleteButton = document.createElement("button");
      deleteButton.className =
        "delete-task bg-red-500 text-white rounded-lg px-4 py-2  focus:ring-2 focus:ring-red-400";
      deleteButton.dataset.id = task.id;
      deleteButton.textContent = "🗑️ Delete";

      card.appendChild(title);
      card.appendChild(subject);
      card.appendChild(priority);
      card.appendChild(statusSelect);

      const buttonContainer = document.createElement("div");
      buttonContainer.className =
      "flex justify-center items-center gap-3 mt-3";

      buttonContainer.appendChild(editButton);
      buttonContainer.appendChild(deleteButton);

      card.appendChild(buttonContainer);

      document.getElementById("todo").appendChild(card);
    }

    // --------------------
    // In Progress
    // --------------------

    else if (task.status === "progress") {
      countProgress++;

      const card = document.createElement("div");
      card.className =
        "bg-yellow-100 border border-amber-200 rounded-xl p-4 mb-3 text-left shadow-sm";

      const title = document.createElement("h3");
      title.className = "text-lg font-bold text-amber-900 mb-2";
      title.textContent = task.title;

      const subject = document.createElement("p");
      subject.className = "text-sm text-gray-600 mb-1";
      subject.textContent = `📚 Subject: ${task.subject}`;

      const priority = document.createElement("p");
      priority.className = "text-sm text-gray-600";
      priority.textContent = `⭐ Priority: ${task.priority}`;

      const statusSelect = document.createElement("select");
      statusSelect.dataset.status = task.status;
      statusSelect.dataset.id = task.id;
      statusSelect.className =
        "task-status border rounded-lg p-2 mt-3 w-full focus:ring-2 focus:ring-amber-400";

      statusSelect.innerHTML = `
        <option value="todo">To Do</option>
        <option value="progress">In Progress</option>
        <option value="done">Done</option>
      `;

      const editButton = document.createElement("button");
      editButton.className =
        "edit-task bg-amber-400 text-white rounded-lg px-4 py-2  focus:ring-2 focus:ring-amber-400";
      editButton.dataset.id = task.id;
      editButton.textContent = "✨ Edit";

      const deleteButton = document.createElement("button");
      deleteButton.className =
        "delete-task bg-red-500 text-white rounded-lg px-4 py-2  focus:ring-2 focus:ring-red-400";
      deleteButton.dataset.id = task.id;
      deleteButton.textContent = "🗑️ Delete";

      card.appendChild(title);
      card.appendChild(subject);
      card.appendChild(priority);
      card.appendChild(statusSelect);

    const buttonContainer = document.createElement("div");
    buttonContainer.className =
      "flex justify-center items-center gap-3 mt-3";

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    card.appendChild(buttonContainer);

      document.getElementById("progress").appendChild(card);
    }

    // --------------------
    // Done
    // --------------------

    else if (task.status === "done") {
      countDone++;

      const card = document.createElement("div");
      card.className =
        "bg-green-200 border border-amber-200 rounded-xl p-4 mb-3 text-left shadow-sm";

      const title = document.createElement("h3");
      title.className = "text-lg font-bold text-amber-900 mb-2";
      title.textContent = task.title;

      const subject = document.createElement("p");
      subject.className = "text-sm text-gray-600 mb-1";
      subject.textContent = `📚 Subject: ${task.subject}`;

      const priority = document.createElement("p");
      priority.className = "text-sm text-gray-600";
      priority.textContent = `⭐ Priority: ${task.priority}`;

      const statusSelect = document.createElement("select");
      statusSelect.dataset.status = task.status;
      statusSelect.dataset.id = task.id;
      statusSelect.className =
        "task-status border rounded-lg p-2 mt-3 w-full focus:ring-2 focus:ring-amber-400";

      statusSelect.innerHTML = `
        <option value="todo">To Do</option>
        <option value="progress">In Progress</option>
        <option value="done">Done</option>
      `;

      const editButton = document.createElement("button");
      editButton.className =
        "edit-task bg-amber-400 text-white rounded-lg px-4 py-2  focus:ring-2 focus:ring-amber-400";
      editButton.dataset.id = task.id;
      editButton.textContent = "✨ Edit";

      const deleteButton = document.createElement("button");
      deleteButton.className =
        "delete-task bg-red-500 text-white rounded-lg px-4 py-2  focus:ring-2 focus:ring-red-400";
      deleteButton.dataset.id = task.id;
      deleteButton.textContent = "🗑️ Delete";

      card.appendChild(title);
      card.appendChild(subject);
      card.appendChild(priority);
     card.appendChild(statusSelect);

    const buttonContainer = document.createElement("div");
    buttonContainer.className =
      "flex justify-center items-center gap-3 mt-3";

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    card.appendChild(buttonContainer);

      document.getElementById("done").appendChild(card);
    }
  }

  // --------------------
  // Empty States
  // --------------------

  if (
    countTodo === 0 &&
    tasks.some(function (task) {
      return task.status === "todo";
    }) === false
  ) {
    document.getElementById("todo").innerHTML += `
      <div class="bg-stone-50 border border-amber-200 rounded-xl p-4 mb-3 text-left shadow-sm">
        <h3 class="text-lg font-bold text-amber-900 mb-2">
          No tasks here yet 📭
        </h3>
      </div>
    `;
  }

  if (
    countProgress === 0 &&
    tasks.some(function (task) {
      return task.status === "progress";
    }) === false
  ) {
    document.getElementById("progress").innerHTML += `
      <div class="bg-stone-50 border border-amber-200 rounded-xl p-4 mb-3 text-left shadow-sm">
        <h3 class="text-lg font-bold text-amber-900 mb-2">
          No tasks here yet 📭
        </h3>
      </div>
    `;
  }

  if (
    countDone === 0 &&
    tasks.some(function (task) {
      return task.status === "done";
    }) === false
  ) {
    document.getElementById("done").innerHTML += `
      <div class="bg-stone-50 border border-amber-200 rounded-xl p-4 mb-3 text-left shadow-sm">
        <h3 class="text-lg font-bold text-amber-900 mb-2">
          No tasks here yet 📭
        </h3>
      </div>
    `;
  }

  // --------------------
  // Edit Buttons
  // --------------------

  const editButtons = document.querySelectorAll(".edit-task");

  editButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const taskId = button.dataset.id;

      const task = tasks.find(function (task) {
        return String(task.id) === taskId;
      });

      editingTaskId = taskId;

      document.getElementById("task-title").value = task.title;
      document.getElementById("task-subject").value = task.subject;
      document.getElementById("task-priority").value = task.priority;

      document.getElementById("task-title").focus();
    });
  });

  // --------------------
  // Delete Buttons
  // --------------------

  const deleteButtons = document.querySelectorAll(".delete-task");

  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const taskId = button.dataset.id;

      const confirmed = confirm(
        "Are you sure you want to delete this task?"
      );

      if (confirmed) {
        tasks = tasks.filter(function (task) {
          return String(task.id) !== taskId;
        });

        saveTasks();
        renderBoard();
      }
    });
  });

  // --------------------
  // Status Selects
  // --------------------

  const statusSelects = document.querySelectorAll(".task-status");

  statusSelects.forEach(function (select) {
    select.value = select.dataset.status;

    select.addEventListener("change", function () {
      const taskId = select.dataset.id;

      const task = tasks.find(function (task) {
        return String(task.id) === taskId;
      });

      task.status = select.value;

      saveTasks();
      renderBoard();
    });
  });

  updateStats();
}

// --------------------
// Main HTML
// --------------------

document.querySelector("#app").innerHTML = `
  <div class="min-h-screen bg-[#faf6ee]  ">
 <!-- Header -->
      <header class="text-center mb-4 bg-[#f3ead8] px-4 py-8 md:px-6 md:py-10 shadow-md">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-950">
         📚 Study Sprint Board
       </h1>

       <p class="text-gray-600 mt-3 max-w-2xl mx-auto">
      Organize your study tasks, track your progress, and stay focused.
      </p>
    </header>


  <div class="max-w-7xl mx-auto px-4 ">
    <!-- Statistics -->
    <div
      id="stats"
      class="bg-[#fffaf0] rounded-2xl shadow-sm border border-amber-200 p-6 mb-8 text-center"
    >
      <p class="text-lg font-bold text-amber-900">
        Progress
      </p>

      <div
        id="stats-content"
        class="mt-2 text-gray-700"
      ></div>
    </div>

    <!-- Search and Filters -->
    <div
      class="flex flex-col md:flex-row justify-center items-end gap-4 mb-12"
    >

      <div class="w-full md:w-1/2">
        <label
          for="search-input"
          class="block mb-2 font-medium text-amber-900"
        >
          Search tasks
        </label>

        <input
          id="search-input"
          type="text"
          placeholder="🔍 Search by task title or subject..."
          class="border border-amber-200 bg-white rounded-2xl w-full p-4 shadow-sm outline-none focus:ring-2 focus:ring-amber-400"
        >
      </div>

      <div class="w-full md:w-48">
        <label
          for="priority-filter"
          class="block mb-2 font-medium text-amber-900"
        >
          Priority
        </label>

        <select
          id="priority-filter"
          class="border border-amber-200 bg-white rounded-2xl w-full p-4 shadow-sm outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="all">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div class="w-full md:w-48">
        <label
          for="status-filter"
          class="block mb-2 font-medium text-amber-900"
        >
          Status
        </label>

        <select
          id="status-filter"
          class="border border-amber-200 bg-white rounded-2xl w-full p-4 shadow-sm outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="all">All statuses</option>
          <option value="todo">To Do</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div class="w-full md:w-auto pt-7">
        <button
         id="clear-filters"
        class="bg-amber-700 text-white rounded-2xl w-full md:w-36 px-5 py-4 shadow-sm transition duration-200 hover:bg-amber-800 focus:ring-2 focus:ring-amber-400"  >
        Clear filters
        </button>
      </div>

    <div class="w-full md:w-auto pt-7">
      <button
       id="reset-tasks"
       class="bg-red-400 text-white rounded-2xl w-full md:w-36 px-5 py-4 shadow-sm transition duration-200 hover:bg-red-500 focus:ring-2 focus:ring-red-400"      >
       Reset Tasks
     </button>
    </div>

    </div>

    <!-- Task Form -->
    <form
      id="task-form"
      class="bg-white rounded-2xl shadow-md border border-amber-100 p-6 mb-10 max-w-3xl mx-auto"
    >

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label
            for="task-title"
            class="block mb-2 font-medium"
          >
            Task title
          </label>

          <input
            id="task-title"
            type="text"
            placeholder="Task title"
            class="border border-amber-200 rounded-xl p-3 outline-none w-full focus:ring-2 focus:ring-amber-400"
          >

          <div
            id="title-error"
            class="text-red-500 text-sm mt-1"
          ></div>
        </div>

        <div>
          <label
            for="task-subject"
            class="block mb-2 font-medium"
          >
            Subject
          </label>

          <input
            id="task-subject"
            type="text"
            placeholder="Subject"
            class="border border-amber-200 rounded-xl p-3 outline-none w-full focus:ring-2 focus:ring-amber-400"
          >

          <div
            id="subject-error"
            class="text-red-500 text-sm mt-1"
          ></div>
        </div>

        <div>
          <label
            for="task-priority"
            class="block mb-2 font-medium"
          >
            Priority
          </label>

          <select
            id="task-priority"
            class="border border-amber-200 rounded-xl p-3 outline-none w-full focus:ring-2 focus:ring-amber-400"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

      </div>


<div class="flex flex-col md:flex-row justify-center items-center gap-3 mt-4">
  <button
    type="submit"
    class="w-full md:w-auto bg-amber-500 text-white rounded-2xl px-6 py-4 font-bold shadow-sm transition duration-200 hover:bg-amber-800 focus:ring-2 focus:ring-amber-400"
  >
    ➕ Add Task
  </button>

  <button
    type="button"
    id="save-edit"
    class="w-full md:w-auto bg-green-600 text-white rounded-2xl px-6 py-4 font-bold shadow-sm transition duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-400"
  >
    💾 Save Changes
  </button>
</div>
    </form>

    <!-- Task Columns -->
    <div
      class="flex flex-col md:flex-row justify-center gap-8 pb-10 text-center"
    >

      <!-- To Do -->
      <div class="md:w-1/4 w-full">
        <h2 class="text-xl font-bold text-amber-900 mb-4">
          📖 To Do
        </h2>

        <div
          id="todo"
          class="bg-white rounded-2xl shadow-md border border-amber-100 p-4"
        ></div>
      </div>

      <!-- In Progress -->
      <div class="md:w-1/4 w-full">
        <h2 class="text-xl font-bold text-amber-900 mb-4">
          ✏️ In Progress
        </h2>

        <div
          id="progress"
          class="bg-white rounded-2xl shadow-md border border-amber-100 p-4"
        ></div>
      </div>

      <!-- Done -->
      <div class="md:w-1/4 w-full">
        <h2 class="text-xl font-bold text-amber-900 mb-4">
          ✅ Done
        </h2>

        <div
          id="done"
          class="bg-white rounded-2xl shadow-md border border-amber-100 p-4"
        ></div>
      </div>

    </div>
  </div>
  </div>
`;

// --------------------
// DOM Elements
// --------------------

const form = document.getElementById("task-form");
const searchInput = document.getElementById("search-input");
const priorityFilter = document.getElementById("priority-filter");
const statusFilter = document.getElementById("status-filter");
const saveEdit = document.getElementById("save-edit");
const clearFilters = document.getElementById("clear-filters");
const resetTasks = document.getElementById("reset-tasks");

// --------------------
// Filters
// --------------------

function applyFilters() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedPriority = priorityFilter.value;
  const selectedStatus = statusFilter.value;

  const filteredTasks = tasks.filter(function (task) {
    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.subject.toLowerCase().includes(searchText);

    const matchesPriority =
      selectedPriority === "all" ||
      task.priority === selectedPriority;

    const matchesStatus =
      selectedStatus === "all" ||
      task.status === selectedStatus;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  renderBoard(filteredTasks);
}

// --------------------
// Filter Events
// --------------------

searchInput.addEventListener("input", function () {
  applyFilters();
});

priorityFilter.addEventListener("change", function () {
  applyFilters();
});

statusFilter.addEventListener("change", function () {
  applyFilters();
});

clearFilters.addEventListener("click", function () {
  searchInput.value = "";
  priorityFilter.value = "all";
  statusFilter.value = "all";

  applyFilters();
});

// --------------------
// Reset Tasks
// --------------------

resetTasks.addEventListener("click", function () {
  const confirmed = confirm(
    "Are you sure you want to reset all tasks?"
  );

  if (confirmed) {
    tasks = [...sampleTasks];

    saveTasks();
    renderBoard();
  }
});

// --------------------
// Save Edited Task
// --------------------

saveEdit.addEventListener("click", function () {
  if (editingTaskId === null) {
    return;
  }

  const task = tasks.find(function (task) {
    return String(task.id) === editingTaskId;
  });

  task.title = document.getElementById("task-title").value.trim();
  task.subject = document.getElementById("task-subject").value.trim();
  task.priority = document.getElementById("task-priority").value;

  editingTaskId = null;

  saveTasks();
  renderBoard();
});

// --------------------
// Add / Edit Task Form
// --------------------

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("task-title").value.trim();
  const subject = document.getElementById("task-subject").value.trim();
  const priority = document.getElementById("task-priority").value;

  document.getElementById("title-error").innerHTML = "";
  document.getElementById("subject-error").innerHTML = "";

  if (title === "") {
    document.getElementById("title-error").innerHTML =
      "Please enter a task title!";
    return;
  }

  if (subject === "") {
    document.getElementById("subject-error").innerHTML =
      "Please enter a subject!";
    return;
  }

  if (editingTaskId !== null) {
    const task = tasks.find(function (task) {
      return String(task.id) === editingTaskId;
    });

    task.title = title;
    task.subject = subject;
    task.priority = priority;

    editingTaskId = null;

    saveTasks();
  }

  else {
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      subject: subject,
      priority: priority,
      status: "todo"
    };

    tasks.push(newTask);

    saveTasks();
  }

  renderBoard();
});

// --------------------
// Initial Render
// --------------------

renderBoard();
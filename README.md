# Study Sprint Board

A responsive study task management board built with Vanilla JavaScript, Vite, and Tailwind CSS.

## GitHub Repository

[View the project on GitHub](https://github.com/zeinabgh1997/study-sprint-board-task5.git)

## Features

* Add new study tasks
* Edit existing tasks
* Delete tasks
* Move tasks between:

  * To Do
  * In Progress
  * Done
* Search tasks by title or subject
* Filter tasks by priority and status
* Clear active filters
* Reset tasks to sample data
* Live task statistics and progress percentage
* Save tasks in browser `localStorage`
* Responsive mobile and desktop layout
* Keyboard-friendly focus states
* Accessible form labels
* Validation messages near related inputs
* Safe rendering of user-entered text with DOM nodes and `textContent`

## Technologies

* HTML
* Vanilla JavaScript
* Vite
* Tailwind CSS
* Browser `localStorage` API

## Project Structure


study-sprint-board/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js
    └── style.css


## Getting Started

### 1. Install dependencies


npm install


### 2. Start the development server


npm run dev


### 3. Build for production


npm run build


After running the development command, open the local URL shown by Vite in your browser.

## Data Storage

Task data is stored in the browser using the `localStorage` API.

The application uses the following storage key:


task4-study-board


The task list is converted to JSON before it is stored in `localStorage`.

Because the data is stored in the browser, tasks remain available after refreshing the page on the same browser.

## Task Data

Each task contains:

* `id`
* `title`
* `subject`
* `priority`
* `status`

Possible task statuses are:


todo
progress
done


## Progress Statistics

The progress section displays:

* Total tasks
* To Do count
* In Progress count
* Done count
* Completion percentage

The completion percentage is calculated as:


Done / Total × 100


When there are no tasks, the progress percentage is `0%`.

Statistics are calculated from all tasks and remain independent of active filters.

## Responsive Design

Tailwind CSS responsive classes are used to support different screen sizes.

On smaller screens, the task columns are displayed vertically. On larger screens, they are displayed side by side.

The layout is designed so that controls remain accessible on narrow screens.

## Accessibility

The project includes:

* Labels associated with form controls
* Visible keyboard focus states
* Real HTML `<button>` elements for actions
* Validation messages displayed near the related inputs

These features make the controls easier to use with both keyboard and assistive technologies.

## Safe Text Rendering

User-entered task data is displayed using DOM nodes and `textContent` instead of inserting raw user text directly into HTML.

This prevents user-entered text from being interpreted as HTML.

## Event Handling

The application uses event handlers for:

* Adding tasks
* Editing tasks
* Deleting tasks
* Changing task status
* Searching
* Filtering by priority
* Filtering by status
* Clearing filters
* Resetting tasks

## Testing

The final manual testing flow was:


Add
→ Edit
→ Move
→ Filter
→ Refresh
→ Complete
→ Delete
```

During testing, the following were checked:

* Task data remains synchronized with the board
* Tasks appear in the correct column
* Statistics update correctly
* Progress percentage updates correctly
* Statistics remain correct while filters are active
* Data remains available after refresh
* Responsive layout works on narrow screens
* Keyboard focus is visible
* Validation messages appear near the related inputs
* User-entered text is rendered safely

## Limitations

* The application does not use a backend or database.
* Task data is stored only in the browser's `localStorage`.
* Data is not shared between different browsers or devices.
* Clearing browser storage removes the saved tasks.
* There is no user authentication.
* There is no multi-user support.
* The project does not use a backend API.
* Data persistence depends on the browser's local storage.

## How It Works

The main application state is stored in the `tasks` array.

The `renderBoard()` function is responsible for displaying tasks in the correct columns and attaching event handlers to the generated controls.

The `updateStats()` function calculates the total number of tasks, the number of tasks in each status, and the overall completion percentage.

User interactions are handled through event listeners for forms, buttons, selects, search input, and filters.

Task data is saved with `saveTasks()` and restored from `localStorage` when the application starts.

## Conclusion

Study Sprint Board is a client-side task management application created to practice:

* JavaScript state management
* DOM manipulation
* Event handling
* Array methods
* Filtering and searching
* `localStorage`
* Responsive design
* Accessibility
* Safe rendering of user-entered content

The project was completed as a practical JavaScript assignment using Vite and Tailwind CSS.

const tasks = [];

function addTask(task) {
  if (!task.title || typeof task.dueTime !== 'number' || typeof task.priority !== 'number') {
    throw new Error("Invalid task data. Ensure title, dueTime, and priority are correctly provided.");
  }
  tasks.push(task);
}

function sortTasksByPriority() {
  return tasks.sort((a, b) => a.priority - b.priority);
}

function getTasksDueSoon(timeFrame) {
  const now = new Date();
  return tasks.filter(task => {
    const dueTime = new Date(now.getTime() + task.dueTime * 60000);
    return dueTime <= new Date(now.getTime() + timeFrame * 60000);
  });
}

function scheduleReminder(task) {
  setTimeout(() => {
    alert(`Reminder: ${task.title} is due soon!`);
  }, task.dueTime * 60000);
}

function displayTasks() {
  const taskListDiv = document.getElementById('taskList');
  taskListDiv.innerHTML = ''; 

  const sortedTasks = sortTasksByPriority();
  sortedTasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>Due in: ${task.dueTime} minutes</p>
      <p>Priority: ${task.priority}</p>
    `;
    taskListDiv.appendChild(taskDiv);
  });
}

document.getElementById('addTaskBtn').addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value.trim();
  const dueTime = parseInt(document.getElementById('taskDueTime').value, 10);
  const priority = parseInt(document.getElementById('taskPriority').value, 10);

  try {
    addTask({ title, dueTime, priority });

    displayTasks();
    const dueSoonTasks = getTasksDueSoon(10);
    dueSoonTasks.forEach(task => scheduleReminder(task));

    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDueTime').value = '';
    document.getElementById('taskPriority').value = '';
  } catch (error) {
    alert(error.message);
  }
});

interface Task {
    id: string;
    content: string;
    completed: boolean;
}

document.addEventListener('DOMContentLoaded', () => {
    const addTaskInput = document.getElementById('addTask') as HTMLInputElement;
    const addTaskButton = document.getElementById('addTaskButton')!;
    const removeAllButton = document.getElementById('removeAllButton')!;
    const todoList = document.querySelector('.todoList')!;
    const removeAllContainer = document.querySelector('.removeAll')!;
  
    const updateVisibility = () => {
        const hasTasks = todoList.children.length > 0;
        (removeAllContainer as HTMLElement).style.display = hasTasks ? '' : 'none';
        (todoList as HTMLElement).style.display = hasTasks ? '' : 'none';
    };
  
    const createTask = (content: string): Task => {
      return {
        id: crypto.randomUUID(),
        content: content,
        completed: false,
      };
    };
  
    const addTask = () => {
      if (addTaskInput.value.trim() === '') return;
      const task = createTask(addTaskInput.value);
  
      const todoBox = document.createElement('div');
      todoBox.className = 'todoBox';
      todoBox.setAttribute('data-task-id', task.id);
      const taskContentHtml = `
          <label class="todoLabel">
              <input type="checkbox" ${task.completed ? 'checked' : ''}>
              <p>${task.content}</p>
          </label>
          <div>
              <button class="editTaskButton"><i class="fa-solid fa-pen"></i></button>
              <button class="removeTaskButton"><i class="fa-solid fa-trash"></i></button>
          </div>
      `;
      todoBox.innerHTML = taskContentHtml;
      todoList.appendChild(todoBox);
      addTaskInput.value = '';
  
      const checkbox = todoBox.querySelector('input[type="checkbox"]') as HTMLInputElement;
      const taskParagraph = todoBox.querySelector('p')!;
      checkbox?.addEventListener('change', () => {
        task.completed = checkbox.checked;
        taskParagraph.style.textDecoration = task.completed ? 'line-through' : 'none';
      });
  
      const editButton = todoBox.querySelector('.editTaskButton');
      editButton?.addEventListener('click', () => {
        const newContent = prompt('Edit task:', task.content);
        if (newContent !== null && newContent.trim() !== '') {
          task.content = newContent.trim();
          taskParagraph.textContent = task.content;
        }
      });
  
      const removeButton = todoBox.querySelector('.removeTaskButton');
      removeButton?.addEventListener('click', () => {
        todoBox.remove();
        updateVisibility();
      });
      updateVisibility();
    };
  
    const removeAllTasks = () => {
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }
      updateVisibility();
    };
  
    addTaskButton.addEventListener('click', addTask);
    addTaskInput.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          addTask();
        }
      });
    removeAllButton.addEventListener('click', removeAllTasks);
    updateVisibility();
});

import {useState} from 'react';
import {FiTrash, FiCheckSquare} from 'react-icons/fi';

import '../styles/task.scss';

type Task = {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle == ''){
      throw new Error("Task's title can't be void");
    }

    const newTask: Task = {
      id: Math.floor(Math.random() * 99999999999),
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks(prevState => {
      return [
        ...prevState,
        newTask
      ]
    })
  }

  function handleToggleTaskCompletion(id: number) {
    const tasksUpdated = tasks.map(task => {
      if (task.id == id) {
        return {
          ...task,
          isComplete: !task.isComplete,
        }
      }else {
        return task;
      }
    });

    setTasks(tasksUpdated);
  }

  function handleRemoveTask(id: number) {
    const tasksUpdated = tasks.filter(task => task.id !== id);
    setTasks(tasksUpdated);
  }

  return(
    <section className="task-list container">
      <header>
        <h1>Minhas Tasks</h1>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo to do" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
        </ul>
      </main>

    </section>
  );
}
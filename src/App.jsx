import { useEffect, useState } from "react";
import { remult } from "remult";
import { Task } from "./shared/task";
import { TasksController } from "./shared/TasksController.js";

const taskRepo = remult.repo(Task);
function fetchTasks() {
  return taskRepo.find({
    where: {
      completed: undefined,
    },
  });
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const addTask = async () => {
    if (newTaskTitle) {
      const newTask = await taskRepo.insert({
        title: newTaskTitle,
      });
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  const setAll = async (completed) => {
    await TasksController.setAll(completed);
    fetchTasks().then(setTasks);
  };

  return (
    <div>
      <main>
        <input
          value={newTaskTitle}
          onBlur={addTask}
          placeholder="What needs to be done?"
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        {tasks.map((task) => {
          const setTask = (value) =>
            setTasks(tasks.map((t) => (t === task ? value : t)));

          const setCompleted = async (completed) => {
            setTask(await taskRepo.save({ ...task, completed }));
          };
          const setTitle = (title) => {
            setTask({ ...task, title });
          };
          const deleteTask = async () => {
            await taskRepo.delete(task);
            setTasks(tasks.filter((t) => t !== task));
          };
          const saveTask = async () => {
            try {
              await taskRepo.save(task);
            } catch (error) {
              alert(error.message);
            }
          };
          return (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <input
                value={task.title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={saveTask}
              />
              <button onClick={deleteTask}>x</button>
            </div>
          );
        })}
      </main>
      <div>
        <button onClick={() => setAll(true)}>Set all as completed</button>
        <button onClick={() => setAll(false)}>Set all as uncompleted</button>
      </div>
    </div>
  );
}
export default App;

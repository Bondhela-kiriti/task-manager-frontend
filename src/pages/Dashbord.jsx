import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../api'


const Dashboard=()=> {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle complete/incomplete
  const toggleTask = async (id, completed) => {
    try {
      await API.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Start editing
  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
  };

  // Save edited task
  const saveEdit = async (id) => {
    try {
      await API.put(`/tasks/${id}`, { title: editTitle });
      setEditingTask(null);
      setEditTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

 return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <form  className="task-form" onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Task"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTask === task._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => saveEdit(task._id)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className={task.completed ? "completed" : ""}>
                  {task.title}
                </span>
                <button onClick={() => toggleTask(task._id, task.completed)}>
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard
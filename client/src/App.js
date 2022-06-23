import React, { useState, useEffect } from "react";
import { handleAddTask, handleDelete, handleUpdate } from "./components/tasks.js";
import { getTasks, addTask, deleteTask, updateTask } from "./services/taskService.js";
import { Paper, TextField, Checkbox, Button } from "@mui/material";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log("Mounting fetch data start")
      const { data } = await getTasks();
      setTasks(data);
      console.log(data, tasks, "Mounting")
    };
    fetchData();
    console.log("Mount function ")
  }, []);

const handleChange = (input) => {
  setCurrentTask(input)
};

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log(currentTask, "HandleChnage Function")
 await handleAddTask(currentTask, setTasks, setCurrentTask, tasks)
};

  return (
    <div className="App flex">
      <Paper elevation={3} className="container">
        <div className="heading">TO-DO</div>
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
          className="flex"
          style={{ margin: "15px 0" }}
        >
          <TextField
            variant="outlined"
            size="small"
            style={{ width: "80%" }}
            value={currentTask}
            required={true}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Add New TO-DO"
          />
          <Button
            style={{ height: "40px" }}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Add task
          </Button>
        </form>
        <div>
          {tasks?.map((task) => (
            <Paper key={task._id} className="flex task_container">
              {/* <Checkbox
                checked={task.completed}
                onClick={() => handleUpdate(task._id)}
                color="primary"
              /> */}
              <div className={task.completed ? "task line_through" : "task"}>
                {task.task}
              </div>
              <Button onClick={() => handleDelete(task._id, tasks, setTasks)} color="secondary">
                delete
              </Button>
            </Paper>
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default App;

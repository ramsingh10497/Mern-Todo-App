import React, { useState, useEffect } from "react";
import {
  handleAddTask,
  handleDelete,
  handleUpdate,
} from "./components/tasks.js";
import { getTasks } from "./services/taskService.js";
import { Paper, TextField, Button } from "@mui/material";
import "./App.css";
import { Container } from "@mui/system";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const [updateStatus, setUpdateStatus] = useState({
    show: false,
    id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(updateStatus, "Mounting fetch data start");
      const { data } = await getTasks();
      setTasks(data);
    };
    fetchData();
  }, []);

  const handleChange = (input) => {
    setCurrentTask(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(currentTask, "HandleChnage Function");
    await handleAddTask(currentTask, setTasks, setCurrentTask, tasks);
  };

  const handleUpdateStatus = (id) => {
    setUpdateStatus((prevState) => {
      console.log(updateStatus, id, "Status");
      return {
        show: !prevState.show,
        id: id,
      };
    });
  };

  return (
    <div className="App flex">
      <Paper elevation={3} className="container">
        <div className="heading">TO-DO</div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
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
            <Container key={task?._id}>
              {/* {console.log(task?._id, "Inside Map")} */}
              <Paper className="flex task_container">
                <div className={task?.completed ? "task line_through" : "task"}>
                  {task?.task}
                </div>
                <Button
                  onClick={() => {
                    handleUpdateStatus(task?._id);
                  }}
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(task?._id, tasks, setTasks)}
                  color="secondary"
                >
                  delete
                </Button>
              </Paper>

              {updateStatus?.show && updateStatus?.id === task?._id && (
                <Paper>
                  <TextField
                    variant="outlined"
                    size="small"
                    style={{ width: "60%" }}
                    value={currentTask}
                    required={true}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Update Todo"
                  />

                  <Button
                    onClick={() => {
                      handleUpdateStatus(task?._id);
                    }}
                    color="primary"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleUpdate(task?._id, tasks, setTasks)}
                    color="secondary"
                    variant="outlined"
                  >
                    Update
                  </Button>
                </Paper>
              )}
            </Container>
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default App;

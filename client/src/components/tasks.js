import {
  addTask,
  deleteTask,
  updateTask,
} from "../services/taskService";

  const handleAddTask = async (currentTask, setTasks, setCurrentTask, tasks) => {
    try {
      const { data } = await addTask({ task: currentTask });
      debugger
      setTasks([...tasks, data]);
      setCurrentTask("");
    } catch (error) {
      console.log(error, "Error");
      setCurrentTask("");
    }
  }

  const handleUpdate = async (currentTask, setTasks, tasks) => {
    const originalTasks = tasks;
    try {
      const index = originalTasks.findIndex((task) => task._id === currentTask);
      originalTasks[index] = { ...originalTasks[index] };
      originalTasks[index].completed = !originalTasks[index].completed;
      setTasks(originalTasks);
      await updateTask(currentTask, {
        completed: originalTasks[index].completed,
      });
    } catch (error) {
      setTasks(originalTasks);
      console.log(error);
    }
  };

  const handleDelete = async (id, tasks, setTasks) => {
    try {
      const originalTasks = tasks.filter((task) => task._id !== id);
      setTasks(originalTasks);
      await deleteTask(id);
    } catch (error) {
      console.log(error);
    }
  };

export  {
  handleAddTask,
  handleUpdate,
  handleDelete
};

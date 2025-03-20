import { Task } from "../models/task.model.js";

export const addTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (
      status !== "pending" &&
      status !== "in-progress" &&
      status !== "completed"
    ) {
      return res.status(400).json({ message: "Incorrect status provided" });
    }

    const newTask = new Task({
      user: req.userId,
      title,
      description,
      dueDate,
      status,
    });

    const savedTask = await newTask.save();

    if (savedTask) {
      return res.status(201).json(savedTask);
    }
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const tasks = await Task.find({ user: req.userId });
    if (tasks) {
      return res.status(200).json(tasks);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskToBeDeleted = await Task.findById(id);
    if (!taskToBeDeleted) {
      return res.status(400).json({ message: "Task not found" });
    }

    if (taskToBeDeleted.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this task" });
    }

    await taskToBeDeleted.deleteOne();
    return res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const { id } = req.params;
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    if (
      status !== "pending" &&
      status !== "in-progress" &&
      status !== "completed"
    ) {
      return res.status(400).json({ message: "Incorrect status provided" });
    }

    if (status !== undefined) task.status = status;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;

    const updatedTask = await task.save();

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};

const Task = require('../models/Task');

// GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const { status, priority, sort } = req.query;
    let query = { user: req.user._id };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    const sortObj = sort === 'dueDate' ? { dueDate: 1 } : sort === 'priority' ? { priority: -1 } : { createdAt: -1 };
    const tasks = await Task.find(query).sort(sortObj);
    res.json(tasks);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const task = await Task.create({ user: req.user._id, title, description, status, priority, dueDate });
    res.status(201).json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/tasks/:id
const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/tasks/stats
const getStats = async (req, res) => {
  try {
    const [total, completed, inProgress, pending] = await Promise.all([
      Task.countDocuments({ user: req.user._id }),
      Task.countDocuments({ user: req.user._id, status: 'completed' }),
      Task.countDocuments({ user: req.user._id, status: 'in-progress' }),
      Task.countDocuments({ user: req.user._id, status: 'pending' }),
    ]);
    res.json({ total, completed, inProgress, pending });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask, getStats };

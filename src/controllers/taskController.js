const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const Task = require('../models/task');
const Project = require('../models/project');
const User = require('../models/Users');

exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assigneeId } = req.body;

    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const assignee = await User.findByPk(assigneeId);
    if (!assignee) return res.status(404).json({ message: 'Assignee not found' });

    const task = await Task.create({
      title,
      description,
      projectId,
      assigneeId,
      creatorId: req.user.id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const tasks = await sequelize.query(
      `CALL sp_get_user_tasks(:userId, :search, :limit, :offset)`,
      {
        replacements: {
          userId: req.user.id,
          search: `%${search}%`,
          limit: parseInt(limit),
          offset: parseInt(offset)
        },
        type: QueryTypes.RAW
      }
    );

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId, status, description } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task || task.deleted) return res.status(404).json({ message: 'Task not found' });

    if (task.creatorId !== req.user.id && task.assigneeId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    task.status = status || task.status;
    task.description = description || task.description;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task || task.deleted) return res.status(404).json({ message: 'Task not found' });

    if (task.creatorId !== req.user.id && task.assigneeId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    task.deleted = true;
    await task.save();

    res.json({ message: 'Task soft deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

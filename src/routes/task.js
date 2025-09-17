const express = require('express');
const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks', getMyTasks);
router.put('/tasks', updateTask);
router.delete('/tasks', deleteTask);

module.exports = router;

const express = require('express');
const { createProject, addMember } = require('../controllers/projectController');

const router = express.Router();

// Create a new project
router.post('/', createProject);

// Add a member to an existing project
router.post('/add-member', addMember);

module.exports = router;

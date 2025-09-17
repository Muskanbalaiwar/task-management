const Project = require('../models/project');
const ProjectMember = require('../models/projectMember');
const User = require('../models/Users');

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      ownerId: req.user.id
    });

    // Add owner as member
    await ProjectMember.create({ projectId: project.id, userId: req.user.id });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findByPk(projectId);
    if (project.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Only owner can add members' });
    }

    const member = await User.findByPk(userId);
    if (!member) return res.status(404).json({ message: 'User not found' });

    await ProjectMember.create({ projectId, userId });

    res.json({ message: 'Member added to project' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

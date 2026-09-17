const Issue = require('../models/Issue');

const allowedStatuses = ['Open', 'In Progress', 'Closed'];

function isValidId(id) {
  return /^\d+$/.test(id);
}

async function getIssues(req, res, next) {
  try {
    const issues = await Issue.find().sort({ id: 1 });
    res.status(200).json(issues);
  } catch (error) {
    next(error);
  }
}

async function getIssue(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const issue = await Issue.findOne({ id: Number(req.params.id) });

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json(issue);
  } catch (error) {
    next(error);
  }
}

async function createIssue(req, res, next) {
  try {
    const { title, description } = req.body;

    if (typeof title !== 'string' || !title.trim() ||
        typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({
        message: 'Title and description are required'
      });
    }

    const latestIssue = await Issue.findOne().sort({ id: -1 });
    const nextId = latestIssue ? latestIssue.id + 1 : 1;

    const issue = await Issue.create({
      id: nextId,
      title: title.trim(),
      description: description.trim(),
      status: 'Open'
    });

    res.status(201).json(issue);
  } catch (error) {
    next(error);
  }
}

async function updateIssue(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const { title, description, status } = req.body;

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    if (description !== undefined &&
        (typeof description !== 'string' || !description.trim())) {
      return res.status(400).json({ message: 'Description cannot be empty' });
    }

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description.trim();
    if (status !== undefined) updates.status = status;

    const issue = await Issue.findOneAndUpdate(
      { id: Number(req.params.id) },
      updates,
      { new: true, runValidators: true }
    );

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json(issue);
  } catch (error) {
    next(error);
  }
}

async function deleteIssue(req, res, next) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const issue = await Issue.findOneAndDelete({ id: Number(req.params.id) });

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.status(200).json({ message: 'Issue deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue
};
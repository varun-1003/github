const express = require('express');
const {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue
} = require('../controllers/issueController');

const router = express.Router();

router.get('/', getIssues);
router.get('/:id', getIssue);
router.post('/', createIssue);
router.put('/:id', updateIssue);
router.delete('/:id', deleteIssue);

module.exports = router;
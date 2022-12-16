const express = require('express')
const Task = require('../models/taskModel')
const router = express.Router()
const {
  createTask,
  getTasks,
  updateTask,
  getSingleTask,
  deleteTask
} = require('../Controllers/taskController')

// router.route('/').get(getTasks).post(createTask)
// router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

router.post('/', createTask)
router.get('/', getTasks)
router.get('/:id', getSingleTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router

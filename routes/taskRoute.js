const express = require('express');
const authenticateUser = require('../config/middlewares/authMiddleware');
const { 
    getAllTask, 
    createTask, 
    getTask, 
    updateTask, 
    deleteTask 
} = require('../controllers/taskController');
const router = express.Router();

/**
 * ***********AllRoutes************
 * 
 * app.get('/api/v1/tasks')         - get all the tasks
 * app.post('/api/v1/tasks')        - create a new task
 * app.get('/api/v1/tasks/:id')     - get a single task
 * app.patch('/api/v1/tasks/:id')   - update task
 * app.delete('/api/v1/tasks/:id')  - delete task
 * 
 */

router.route('/').get(authenticateUser, getAllTask).post(authenticateUser, createTask);
router.route('/:id').get(authenticateUser, getTask).patch(authenticateUser, updateTask).delete(authenticateUser, deleteTask);

module.exports = router;
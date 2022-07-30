const { NotFoundError, BadRequestError } = require('../config/errors');
const { checkPermission } = require('../config/utils');
const Task = require('../models/Task');

//******************** Get all tasks ******************/
const getAllTask = async (req, res, next) => {
    const { userId } = req.user;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
        message: "Success",
        count: tasks.length,
        tasks: tasks,
    });

}

//******************** Create tasks ******************/
const createTask = async (req, res) => {
    const { name, completed } = req.body;
    if (!name) {
        throw new BadRequestError('Please provide name');
    }
    const { userId } = req.user;
    const task = await Task.create({ name, completed, user: userId });
    res.status(201).json({
        message: "Success",
        task: task
    });


}

//******************** Get single task ******************/
const getTask = async (req, res, next) => {

    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);
    if (!task) {
        throw new NotFoundError(`No task with id: ${taskID}`);
    }
    checkPermission(req.user, task.user);
    res.status(200).json({
        message: "Success",
        task: task
    });

}


//******************* Update task *******************/
const updateTask = async (req, res, next) => {

    const { id: taskID } = req.params;
    //!by default we findOneAndDelete will return the original task, to avoid we have to set option new: true
    //! and also findOneAndUpdate will not run validators so we need to add runValidators: true
    const options = {
        new: true,
        runValidators: true
    }
    const { name, completed } = req.body;
    if (!name || !completed) {
        throw new BadRequestError('Please provide both name and completed');
    }
    const task = await Task.findByIdAndUpdate({ _id: taskID }, { name, completed }, options);
    if (!task) {
        throw new NotFoundError(`No task with id ${taskID}`);
    }
    checkPermission(req.user, task.user);
    res.status(200).json({
        message: "Success",
        task: task
    });

}

//******************** Delete task ********************/
const deleteTask = async (req, res, next) => {

    const { id: taskID } = req.params;
    const task = await Task.findById(taskID);
    if (!task) {
        throw new NotFoundError(`No task with id: ${taskID}`);
    }
    checkPermission(req.user, task.user);
    await Task.findOneAndDelete({ _id: taskID });
    res.status(200).json({
        message: "Success",
    });

}

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
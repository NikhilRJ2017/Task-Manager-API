const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        //*'Name required' is a custom message when the following validation fails
        required: [true, 'Task name required!'],
        //*removes extra spaces
        trim: true
    },
    
    completed: {
        type: Boolean,
        default: false
    },

    user: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
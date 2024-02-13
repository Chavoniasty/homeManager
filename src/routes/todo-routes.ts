import * as express from 'express';
import TodoModel from '../models/todo-model';
import * as mongoose from 'mongoose';

const TodoRoutes = express.Router();

TodoRoutes.get('/todos', async (req, res): Promise<void> => {
    try {
        const todos = await TodoModel.find(req.query);
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

TodoRoutes.post('/todos', async (req, res): Promise<void> => {
    try {
        const { category, title } = req.body;
        if (category && title) {
            const newTodo = new TodoModel({
                _id: new mongoose.Types.ObjectId(),
                category,
                title,
                completed: false,
            });
            const savedTodo = await newTodo.save();
            res.status(201).json(savedTodo);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

TodoRoutes.put('/todos', async (req, res): Promise<void> => {
    try {
        const { _id, completed } = req.body;
        if (_id) {
            const updatedTodo = await TodoModel.findByIdAndUpdate(_id, { completed }, { new: completed });
            res.status(200).json(updatedTodo);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
})

TodoRoutes.delete('/todos', async (req, res): Promise<void> => {
    try {
        const { _id } = req.body;
        if (_id) {
            const deletedTodo = await TodoModel.findByIdAndDelete(_id);
            res.status(200).json(deletedTodo);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
})

export default TodoRoutes;
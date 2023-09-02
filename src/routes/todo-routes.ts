import * as express from 'express';
import TodoModel from '../models/todo-model';

const TodoRoutes = express.Router();

TodoRoutes.get('/todos', async (req, res): Promise<void> => {
    try {
        const todos = await TodoModel.find(req.query);
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});

TodoRoutes.post('/todos', async (req, res): Promise<void> => {
    try {
        const {category, title} = req.body;
        if (category && title) {
            const newTodo = new TodoModel(req.body);
            const savedTodo = await newTodo.save();
            res.status(201).json(savedTodo);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
});

TodoRoutes.put('/todos', async (req, res): Promise<void> => {

})

TodoRoutes.delete('/todos', async (req, res): Promise<void> => {
    const todoID = req.query.todoID;
    try {
        // Use the ID to delete the corresponding todo item
        await TodoModel.deleteOne({_id: todoID});
        res.status(204).send(); // Respond with a 204 status code for a successful deletion
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'}); // Handle errors gracefully
    }
});

export default TodoRoutes;
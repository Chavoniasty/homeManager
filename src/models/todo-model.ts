import mongoose from "mongoose";
import {Types} from "mongoose";

const todoSchema: any = new mongoose.Schema({
    _id: Types.ObjectId,
    category: String,
    title: String,
    completed: Boolean,
}, {versionKey: false})

const TodoModel = mongoose.model('Todo', todoSchema);

export default TodoModel;

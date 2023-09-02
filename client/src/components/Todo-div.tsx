import {Todo} from "../App.tsx"
import mongoose from "mongoose";
import React from "react";
import axios from "axios";

interface TodoDivProp {
    todos: Todo[];
    currentRoom: string;
}

const TodoDiv: React.FC<TodoDivProp> = ({todos, currentRoom}) => {
    const deleteTodo = (todoID: mongoose.Types.ObjectId): void => {
        axios.delete(`http://localhost:3000/api/todos/`, {params: {todoID: todoID}})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className={"h-10"}>
            <ul>
                {todos.map((todo) => {
                    if (todo.category === currentRoom) {
                        return (
                            <li className={"flex flex-row justify-between mx-2 my-4 h-10 border-gray-300 border-2 rounded-xl items-center"}
                                key={todo._id.toString()}>
                                <div>
                                    {todo.title}
                                </div>
                                <div>
                                    <button className={"mx-2"}>
                                        Mark
                                    </button>
                                    <button className={"mx-2"} onClick={() => deleteTodo(todo._id)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        )
                    }
                    return null;
                })}
            </ul>
        </div>
    )
}

export default TodoDiv;
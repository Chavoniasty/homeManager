import {useState} from "react";
import {Todo} from "../App.tsx";
import axios from "axios";
import * as mongoose from "mongoose";

const AddTodo = () => {
    const [tempTodo, setTempTodo] = useState<Todo>({
        _id: new mongoose.Types.ObjectId,
        category: "",
        title: "",
        completed: false,
    });

    const [todos, setTodos] = useState<any[]>([]);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/todos', tempTodo)
            .then((res) => {
                console.log(res);
                // Add the new todo to the todos state with the received _id
                setTodos([...todos, res.data]);
            })
            .catch((err) => {
                console.error(err);
            });
        setTempTodo({
            _id: new mongoose.Types.ObjectId(),
            category: "kitchen",
            title: "",
            completed: false,
        });
    }
    // @ts-ignore
    // @ts-ignore
    return <div className={"border-t border-gray-300 h-8"}>
        <form onSubmit={submitForm} className={"flex flex-col items-center w-full"}>
            <label className={"w-full flex justify-center"}>
                <input
                    type="text"
                    name="temp-todo"
                    placeholder={"Insert your todo here..."}
                    value={tempTodo.title}
                    onChange={(e) =>
                        setTempTodo({...tempTodo, title: e.target.value})
                    }
                    className={"rounded-xl w-4/5 border-2 border-gray-300"}
                />
            </label>
            <div className={"w-full flex justify-center items-center"}>
                <label className={"w-3/5 "}>
                    Select room:
                    <select
                        value={tempTodo.category}
                        className={"mx-2"}
                        name="temp-room"
                        onChange={(e) =>
                            setTempTodo({...tempTodo, category: e.target.value})
                        }>
                        <option value={"kitchen"}>Kitchen</option>
                        <option value={"bedroom"}>Bedroom</option>
                        <option value={"toilet"}>Toilet</option>
                    </select>
                </label>
                <input
                    className={"w-1/5 border-2 border-gray-300 rounded-xl"} type="submit" value="Submit"/>
            </div>
        </form>
    </div>
}

export default AddTodo;
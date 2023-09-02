import {useState, useEffect} from "react";
import axios from "axios";
import * as mongoose from "mongoose";
import TodoDiv from "./components/Todo-div.tsx";
import AddTodo from "./components/AddTodo.tsx"

export interface Todo {
    _id: mongoose.Types.ObjectId,
    category: string,
    title: string,
    completed: boolean,
}

function App() {
    const [todo, setTodo] = useState<any[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string>('kitchen');

    useEffect(() => {
        axios.get('http://localhost:3000/api/todos')
            .then(res => {
                setTodo(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    },);

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <div className="w-full text-center border-b border-gray-300 h-12">
                <ul className="flex flex-row justify-around list-none h-full">
                    <li className={currentRoom === 'kitchen' ? "flex items-center justify-center border-blue-800 text-blue-800 border-b w-1/3" : "w-1/3 flex items-center justify-center"}>
                        <button className={"w-full h-full"} onClick={() => setCurrentRoom('kitchen')}>Kitchen</button>
                    </li>
                    <li className={currentRoom === 'bedroom' ? "flex items-center justify-center border-blue-800 text-blue-800 border-b w-1/3" : "w-1/3 flex items-center justify-center"}>
                        <button className={"w-full h-full"} onClick={() => setCurrentRoom('bedroom')}>Bedroom</button>
                    </li>
                    <li className={currentRoom === 'toilet' ? "flex items-center justify-center border-blue-800 text-blue-800 border-b w-1/3" : "w-1/3 flex items-center justify-center"}>
                        <button className={"w-full h-full"} onClick={() => setCurrentRoom('toilet')}>Toilet</button>
                    </li>
                </ul>
            </div>
            <div className={"h-auto"}>
                <TodoDiv todos={todo} currentRoom={currentRoom}/>
            </div>
            <AddTodo/>
        </div>
    )
}

export default App

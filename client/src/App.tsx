import {useState, useEffect} from "react";
import axios from "axios";
import * as mongoose from "mongoose";
import TodoDiv from "./components/Todo-div.tsx";
import AddTodo from "./components/AddTodo.tsx"
import Navbar from "./components/Navbar.tsx";

export interface Todo {
    _id: mongoose.Types.ObjectId,
    category: string,
    title: string,
    completed: boolean,
}

function App() {
    const [todo, setTodo] = useState<any[]>([]);
    const [rooms, setRooms] = useState<string[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string>(rooms[0]);

    function getFromAPI() {
        axios.get('http://localhost:3000/api/todos')
            .then(res => {
                const fetchedRooms: string[] = Array.from(new Set(res.data.map((todo: any) => todo.category.toString())));
                setTodo(res.data)
                if (fetchedRooms) {
                    const newRooms = fetchedRooms.filter((room: string) => !rooms.includes(room));
                    setRooms([...rooms, ...newRooms]);
                    setCurrentRoom(rooms[0])
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    const addNewRoom = (newRoom): void => {
        if (newRoom) {
            setRooms([...rooms, newRoom.toString().toLowerCase()]);
            setCurrentRoom(newRoom);
        }
    }

    useEffect(() => {
        getFromAPI();
    }, []);


    return (
        <div className="flex flex-col justify-between w-full h-full">
            <div className="w-full text-center border-b border-gray-300 h-12">
               <Navbar rooms={rooms} currentRoom={currentRoom} addNewRoom={addNewRoom} setCurrentRoom={setCurrentRoom}/>
            </div>
            <div className={"h-auto"}>
                <TodoDiv todos={todo} currentRoom={currentRoom}/>
            </div>
            <AddTodo rooms={rooms} getFromAPI={getFromAPI} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/>
        </div>
    )
}

export default App

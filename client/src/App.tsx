import { useState, useEffect } from "react";
import Navbar from "./components/Navbar"
import Todos from "./components/Todos";
import Bottombar from "./components/Bottombar";
import Title from "./components/Title";
import * as mongoose from "mongoose";

export interface Todo {
  _id: mongoose.Types.ObjectId,
  category: string,
  title: string,
  completed: boolean,
}

function App() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>(rooms[0]);

  const addNewRoom = (newRoom: string) => {
    if (newRoom) {
      setRooms([...rooms, newRoom]);
    }
  }

  const fetchAPI = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        const fetchedRooms: string[] = Array.from(new Set(data.map((todo: any) => todo.category.toString())));
        setTodo(data)
        if (fetchedRooms) {
          const newRooms = fetchedRooms.filter((room: string) => !rooms.includes(room));
          setRooms([...rooms, ...newRooms]);
          if (!selectedRoom) {
            setSelectedRoom(fetchedRooms[0]);
          }
        }
      }
    } catch (error) {
      console.log("fetch api didnt work sadge")
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen font-nunito">
      <Title />
      <Todos todos={todo} fetchAPI={fetchAPI} selectedRoom={selectedRoom} />
      <Bottombar todos={todo} rooms={rooms} fetchAPI={fetchAPI} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
      <Navbar rooms={rooms} selectedRoom={selectedRoom} addNewRoom={addNewRoom} setSelectedRoom={setSelectedRoom} />
    </div>
  )
}

export default App

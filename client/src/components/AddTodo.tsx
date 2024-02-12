import { useState } from "react";
import { Todo } from "../App.tsx";
import * as mongoose from "mongoose";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface AddTodoProps {
    rooms: string[];
    fetchAPI: () => void;
    selectedRoom: string;
    setSelectedRoom: (selectedRoom: string) => void;
}

function AddTodo({ rooms, fetchAPI, selectedRoom, setSelectedRoom }: AddTodoProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [tempTodo, setTempTodo] = useState<Todo>({
        _id: new mongoose.Types.ObjectId,
        category: "",
        title: "",
        completed: false,
    });

    const submitTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(tempTodo)
        try {
            const response = await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: tempTodo.category, title: tempTodo.title }),
            })
            if (response.ok) {
                fetchAPI()
                setSelectedRoom(tempTodo.category)
            }
        } catch {
            console.log("post didnt work lmao xdd")
        }
    }

    return (
        <div className="w-full flex flex-row justify-between p-2">
            <h1>
                HomeManager
            </h1>
            <div className="flex flex-row gap-2">
                <button className="text-white bg-blue-400 rounded-full w-12 h-12 flex flex-row items-center justify-center shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                </button>
                <button className="text-white bg-blue-400 rounded-full w-12 h-12 flex flex-row items-center justify-center shadow-2xl" onClick={handleOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <Modal open={open} onClose={handleClose} className="flex flex-col justify-center items-center">
                <Box className="absolute top-50 left-50 bg-white rounded-md">
                    <form onSubmit={submitTodo} className="flex flex-col p-4">
                        <h1 className="my-4">Add new <span className="text-blue-500 font-bold">Todo</span> to your manager:</h1>
                        <input type="text" value={tempTodo.title} onChange={(e) => setTempTodo({ ...tempTodo, title: e.target.value })} className="p-2 border-2 border-gray-200 rounded-xl my-2" placeholder="New todo" />
                        <select
                            value={tempTodo.category}
                            className={"p-2 border-2 border-gray-200 rounded-xl my-2"}
                            name="temp-room"
                            onChange={(e) => setTempTodo({ ...tempTodo, category: e.target.value })} >
                            {rooms.map((room) => (
                                <option key={room} value={room}>{room}</option>
                            ))}
                        </select>
                        <button className=" bg-blue-400 text-white rounded-md shadow-xl py-2 my-2">
                            Submit
                        </button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default AddTodo;


import { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface NavbarProps {
    rooms: string[];
    selectedRoom: string;
    addNewRoom: (newRoom: string) => void;
    setSelectedRoom: (selectedRoom: string) => void;
}

function Navbar({ rooms, selectedRoom, addNewRoom, setSelectedRoom }: NavbarProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newRoom, setNewRoom] = useState<string>("");

    const submitNewRoom = () => {
        addNewRoom(newRoom);
        handleClose();
    }

    return (
        <div className="flex flex-row p-2 justify-around bg-blue-200/45 border-blue-400 rounded-t-xl z-1 ">
            <select id="underline_select" className="block py-1 w-3/5 bg-transparent border-0 border-b-2 border-blue-400 focus:ring-0 focus:border-gray-200 mt-2 " defaultValue={rooms[0]}>
                {rooms.map((room, index) => (
                    <option className="font-body" key={index} value={room} selected={room === selectedRoom ? true : false} onClick={(event) => setSelectedRoom((event.target as HTMLSelectElement).value)}>{room}</option>
                ))}
            </select>
            <button className=" w-1/3 rounded-xl bg-blue-400 text-white" onClick={handleOpen}>
                New room
            </button>
            <Modal open={open} onClose={handleClose} className="flex flex-col justify-center items-center">
                <Box className="absolute top-50 left-50 bg-white rounded-md">
                    <div className="flex flex-col p-4">
                        <h1 className="my-4">Add new <span className="text-blue-500 font-bold">Room</span> to your manager</h1>
                        <input type="text" className="p-2 border-2 border-gray-200 rounded-xl" placeholder="New room" onChange={e => setNewRoom(e.target.value)} />
                        <button className="p-2 mt-2 rounded-xl bg-blue-400 text-white" onClick={submitNewRoom}>Add</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Navbar;
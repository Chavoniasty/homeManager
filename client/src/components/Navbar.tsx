interface NavbarProps {
    rooms: string[];
    currentRoom: string;
    addNewRoom: (newRoom: string) => void;
    setCurrentRoom: (currentRoom: string) => void;
}

function Navbar({ rooms, currentRoom, addNewRoom, setCurrentRoom }: NavbarProps) {
    const handleAddNewRoomClick = () => {
        const newRoom = prompt('Add new room:');
        if (newRoom) {
            addNewRoom(newRoom.toLowerCase());
        }
    }

    return (
        <ul className="flex flex-row justify-around list-none h-full">
            {rooms.map((room) => (
                <li key={room} className={currentRoom === room ?"flex items-center justify-center border-blue-800 text-blue-800 border-b w-1/3" : "w-1/3 flex items-center justify-center"}>
                    <button className={"w-full h-full"} onClick={() => setCurrentRoom(room)}>{room}</button>
                </li>
            ))}
            <button className={ "w-1/3 flex items-center justify-center"} onClick={handleAddNewRoomClick}>
                Add new room
            </button>
        </ul>
    );
}

export default Navbar;
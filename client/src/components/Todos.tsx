import * as mogoose from "mongoose";
import { Todo } from "../App.tsx"

interface Todos {
    todos: Todo[];
    selectedRoom: string;
    fetchAPI: () => void;
}

function Todos({ todos, selectedRoom, fetchAPI }: Todos) {
    const changeTodoStatus = async (id: mogoose.Types.ObjectId, completed: boolean) => {
        try {
            const response = await fetch('http://localhost:3000/api/todos', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id, completed: completed }),
            });
            if (response.ok) {
                fetchAPI()
            }
        } catch {
            console.log("fetch api didnt work sadge")
        }
    }

    const deleteTodo = async (id: mogoose.Types.ObjectId) => {
        try {
            const response = await fetch('http://localhost:3000/api/todos', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: id }),
            });
            if (response.ok) {
                fetchAPI()
            }
        } catch {
            console.log("fetch api didnt work sadge")
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center max-w-2/3 max-h-2/3 overflow-y-auto">
            <ul className="my-2 w-full p-4">
                {todos.map((todo) => {
                    if (todo.category === selectedRoom) {
                        if (todo.completed === false) {
                            return (
                                <li key={todo._id.toString()} className="my-2 p-4 border-2 border-blue-400 bg-blue-100 w-full flex flex-row items-end justify-around rounded-md shadow-xl">
                                    <h1 className="w-3/4 flex flex-row items-center text-md">{todo.title}</h1>
                                    <div className="flex flex-row items-center justify-around w-1/4 lg:justify-end lg:gap-10 ">
                                        <button onClick={() => changeTodoStatus(todo._id, true)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button onClick={() => deleteTodo(todo._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            );
                        } else {
                            return (
                                <li key={todo._id.toString()} className="my-2 p-4 border-2 border-green-400 bg-green-100 w-full flex flex-row items-end justify-around rounded-md shadow-xl">
                                    <h1 className="w-3/4 flex flex-row items-center text-md line-through">{todo.title} {todo.completed}</h1>
                                    <div className="flex flex-row items-center justify-around w-1/4 lg:justify-end lg:gap-10">
                                        <button onClick={() => changeTodoStatus(todo._id, false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                            </svg>
                                        </button>
                                        <button onClick={() => deleteTodo(todo._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            );
                        }
                    }
                })}
            </ul>
        </div>
    );
}

export default Todos;
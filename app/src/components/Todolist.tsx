import { useState, useEffect } from "react";
import axios from "axios";
// const [text, setText] = useState("");
import { useNavigate } from 'react-router-dom'; 



type Todo = {
  id: number;
  title: string;
  year: any;
  completed: boolean;
  setEditIndex: (value: React.SetStateAction<number>) => void;
};

const Todolist = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editIndex, setEditIndex] = useState(0);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchTodos = async (): Promise<void> => {
      const response = await axios.get<Todo[]>("http://localhost:5476/movies");
      setTodos(response.data);
    };

    fetchTodos();
  }, []);

  const addTodo = async (): Promise<void> => {
    const response = await axios.post<Todo>("http://localhost:5000/todos", {
      title: newTodo,
      year: "",
      completed: false,
    });

    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  // const updateTodo = async (id: number, title: string): Promise<void> => {
  //   let updatedTodo = { title, completed: false };
  //   await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo);
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, title: editText } : todo
  //     )
  //   );
  //   setEditIndex(0);
  //   setEditText("");
  //};
  const updateTodo = async (id: number): Promise<void> => {
    if (editText !== "") {
      const updatedtodos = todos.map((todo) =>
        todo.id === id ? { ...todo, title: editText } : todo
      );
      await axios.put(`http://localhost:5000/todos/${id}`, updatedtodos);

      setTodos(updatedtodos);
      setEditIndex(0);
      setEditText("");
    }
  };
  const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:5476/movies/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = async (id: number): Promise<void> => {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:5000/movies/${id}`, updatedTodo);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    }
  };
  const navigate = useNavigate(); 

  const gotToFirstComp = () => { 
  
    // This will navigate to first component 
    navigate('/add');  
  }; 

  return (
    <div>
      <h1>Simple Todo App</h1>

      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />

      <button onClick={addTodo}>Add Todo</button>
      <button onClick={gotToFirstComp}>go to 1st </button> 

      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              // isChecked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {/* <input
              defaultValue={todo.title}
              onBlur={(e) => updateTodo(todo.id, e.target.value)}
            /> */}
            {/* <button onClick={() => UpdateTodo(todo.id)}>Edit</button> */}

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {editIndex === todo.id ? (
                <div>
                  <input
                    type="text"
                    placeholder={todo.title}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder={todo.year}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={() => updateTodo(todo.id)}
                    className="update-btn"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditIndex(0)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p>{todo.title}</p>
                  <p>{todo.year}</p>
                  <button
                    onClick={() => setEditIndex(todo.id)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="del-btn"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;

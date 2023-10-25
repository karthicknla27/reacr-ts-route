import { useState } from "react";

interface IAddTodo {
  onTodoAdd: (str: string) => void;
}

const AddTodo: React.FC<IAddTodo> = ({ onTodoAdd }) => {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onTodoAdd(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <label>
        ADD TODO:
        <input
          className=""
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="add-btn">
        Add
      </button>
    </form>
  );
};

export default AddTodo;
import { useState } from "react";

interface Todo {
  id: number;
  todo: string;
  complete: boolean;
}

function App() {
  const [todo, setTodo] = useState<string>("");
  const [data, setData] = useState<Todo[]>([]);

  //on submit button function, adding todo to data.

  const onBtnSubmitHandle = () => {
    if (!todo) return;

    const newTodo = {
      id: Date.now(),
      todo,
      complete: false,
    };
    setData([...data, newTodo]);
    setTodo("");
  };

  function userTodo(input: string) {
    setTodo(input);
  }

  const onBtnDeleteHandle = (id: number) => {
    const updatedData = data.filter((todos) => id !== todos.id);

    setData(updatedData);
  };

  return (
    <div className="container">
      <InputField userTodo={userTodo} onBtnSubmitHandle={onBtnSubmitHandle} />
      <UserTodos todos={data} onBtnDeleteHandle={onBtnDeleteHandle} />
    </div>
  );
}

///create to-do input field box

interface InputFieldProps {
  userTodo: (input: string) => void;
  onBtnSubmitHandle: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  userTodo,
  onBtnSubmitHandle,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    userTodo(value);
  };

  const handleSubmit = () => {
    onBtnSubmitHandle();
    setInputValue("");
  };

  return (
    <div className="inputField">
      <input type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

interface UserTodosProps {
  todos: Todo[];
  onBtnDeleteHandle: (id: number) => void;
}

const UserTodos: React.FC<UserTodosProps> = ({ todos, onBtnDeleteHandle }) => {
  return (
    <div className="UsersTodos">
      <h1>LIST</h1>
      <ul>
        {todos.map((item) => (
          <div key={item.id}>
            <li>{item.todo}</li>
            <button onClick={() => onBtnDeleteHandle(item.id)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;

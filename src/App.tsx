import { useState } from "react";

interface Todo {
  id: number;
  todo: string;
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
    };
    setData([...data, newTodo]);
    setTodo("");
  };

  function userTodo(input: string) {
    setTodo(input);
  }

  return (
    <div className="container">
      <InputField userTodo={userTodo} onBtnSubmitHandle={onBtnSubmitHandle} />
      <UserTodos todos={data} />
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
}

const UserTodos: React.FC<UserTodosProps> = ({ todos }) => {
  return (
    <div className="UsersTodos">
      <h1>LIST</h1>
      <ul>
        {todos.map((item) => (
          <div key={item.id}>
            <li>{item.todo}</li>
            <button>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;

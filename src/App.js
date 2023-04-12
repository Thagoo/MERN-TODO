import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Todo />} />
          <Route path="/todo-form" element={<TodoForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

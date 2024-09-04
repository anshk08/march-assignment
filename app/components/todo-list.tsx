"use client";
import { useEffect, useState } from "react";
import TodoItem from "./todo-item";
import TodoForm from "./todo-form";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=1"
    );
    const data: Todo[] = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (todo: { title: string }) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: todo.title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleEdit = async (id: number, title: string) => {
    const updatedTodo: Todo = { id, title, completed: false };
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const handleDelete = async (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center mb-10 overflow-hidden">
      <div className="mt-8 w-full px-4">
        <TodoForm onSubmit={handleCreate} />
      </div>
      <div className="w-[100vw] px-4 flex flex-col items-center justify-center break-normal">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

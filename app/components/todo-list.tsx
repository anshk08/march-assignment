"use client";
import { useEffect, useState } from "react";
import TodoItem from "./todo-item";
import TodoForm from "./todo-form";
import { LoaderCircle } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch("/api/todos");
    const data: Todo[] = await res.json();
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreate = async (todo: { title: string }) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  const handleEdit = async (id: number, title: string) => {
    const res = await fetch(`/api/todos`, {
      method: "PATCH",
      body: JSON.stringify({ id, title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedTodo = await res.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center mb-10 overflow-hidden">
      <div className="mt-8 w-full px-4">
        <TodoForm onSubmit={handleCreate} />
      </div>
      <div className="w-[100vw] px-4 flex flex-col items-center justify-center break-normal">
        {loading ? (
          <LoaderCircle className="text-blue-500 animate-spin" />
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

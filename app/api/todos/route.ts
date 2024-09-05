import { NextResponse } from "next/server";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET() {
  const response = await fetch(`${API_URL}?_limit=5`);
  const todos = await response.json();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const newTodo = await request.json();
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const todo = await response.json();
  return NextResponse.json(todo);
}

export async function PATCH(request: Request) {
  const updatedTodo = await request.json();
  const { id } = updatedTodo;
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedTodo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const todo = await response.json();
  return NextResponse.json(todo);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return NextResponse.json({ message: "Deleted" });
  }
  return NextResponse.json({ error: "ID not provided" });
}

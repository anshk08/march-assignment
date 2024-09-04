import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Pencil, Square, SquareCheck, Trash } from "lucide-react";
import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(!completed);
  };

  const handleSave = () => {
    onEdit(todo.id, editTitle);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "mb-2 flex items-center rounded-md w-full md:w-[50vw] gap-2 border-2 p-3 break-all",
        completed && "border-blue-500"
      )}
    >
      {completed ? (
        <SquareCheck
          className="size-4 cursor-pointer text-blue-500"
          onClick={handleComplete}
        />
      ) : (
        <Square
          className="size-4 cursor-pointer hover:text-blue-500"
          onClick={handleComplete}
        />
      )}
      {isEditing ? (
        <div className="w-full">
          <form className="flex items-center justify-center gap-3">
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full"
            />
            <Button
              onClick={handleSave}
              variant="ghost"
              className="p-0 hover:text-blue-500 hover:bg-transparent"
              type="submit"
            >
              <Check className="size-4 cursor-pointer" />
            </Button>
          </form>
        </div>
      ) : (
        <div className="w-full flex items-center justify-between gap-2">
          <p
            className={cn(
              completed && "line-through decoration-[3px] decoration-blue-500"
            )}
          >
            {todo.title}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Pencil
              onClick={() => setIsEditing(true)}
              className="cursor-pointer size-4 hover:text-blue-500"
            />
            <Trash
              className="cursor-pointer size-4 hover:text-red-500"
              onClick={() => onDelete(todo.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

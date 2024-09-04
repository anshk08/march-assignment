import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type TodoFormProps = {
  onSubmit: (todo: { title: string; completed?: boolean }) => void;
  initialTitle?: string;
};

export default function TodoForm({
  onSubmit,
  initialTitle = "",
}: TodoFormProps) {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title });
      setTitle("");
    }
  };

  return (
    <div className="mb-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-2 w-full md:w-[50vw]"
      >
        <Input
          type="text"
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-black/15 dark:border-white/15"
          placeholder="Enter todo title"
        />
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white"
        >
          Add Todo
        </Button>
      </form>
    </div>
  );
}

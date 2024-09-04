import { ModeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between px-5 py-2">
      <div className="font-bold text-xl">
        <p>
          March Crud <span className="text-blue-500">Assignment</span>
        </p>
      </div>
      <ModeToggle />
    </div>
  );
};

export default Header;

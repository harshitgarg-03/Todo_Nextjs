import TodoForm from "@/components/AddtodoForm";
import GetTodoList from "@/components/todo-list";
import dbConnection from "@/lib/database";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  await dbConnection();
  return (
    <div className="overflow-y-scroll  no-scrollbar">
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-lg font-semibold">Todo App</span>

        <Link 
          href="/todos"
          className="bg-white text-indigo-600 px-4 py-1 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Todos
        </Link>
      </div>
    </nav>

    {/* <TodoForm/> */}
    <GetTodoList/>
    <footer className="w-full bg-gray-900 text-gray-300 py-4 mt-10">
      <div className="max-w-5xl mx-auto text-center text-sm">
        © {new Date().getFullYear()} Todo App • Built with Next.js + TanStack Query
      </div>
    </footer>
    </div>
  );
}

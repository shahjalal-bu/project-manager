import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ProjectsContainer({
  children,
  content,
  setSearch,
  search,
}) {
  return (
    <>
      <div className="flex flex-col  h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-indigo-200 via-blue-200 to-purple-200">
        <Navbar projects setSearch={setSearch} search={search} />
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Project Board</h1>
        </div>
        {content}
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}

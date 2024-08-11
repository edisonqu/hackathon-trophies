const Nav = () => {
  return (
    <div className="fixed bottom-10 w-screen grid place-items-center min-h-20 z-10 pointer-events-none">
      <div className="bg-black bg-opacity-50 text-white p-4 rounded-md flex items-center shadow-lg pointer-events-auto">
        <div className="flex gap-4 items-center">
          <button className="bg-white text-gray-950 px-4 py-2 rounded-md flex items-center justify-center">
            <span className="mr-2">🏠</span>{" "}
            {/* You can replace this with an actual icon */}
            Home
          </button>
          <button className="bg-transparent text-white border border-white px-4 py-2 rounded-lg flex items-center justify-center">
            <span className="mr-2">⌘ + K</span>
            Search
          </button>
        </div>
        <div className="w-12 h-12 bg-gray-900 rounded-md ml-4 flex items-center justify-center">
          <span className="text-white">pic</span>{" "}
          {/* Replace with an actual image or icon */}
        </div>
      </div>
    </div>
  );
};

export default Nav;

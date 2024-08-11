const Nav = () => {
  return (
    <div className="fixed bottom-0 w-screen grid place-items-center min-h-20 z-10">
      <div className="bg-[#36312950] text-white p-[10px] rounded-[10px]">
        <div className="flex gap-[10px]">
          <button className="bg-white text-gray-950 px-4 py-3 rounded-sm w-fit">
            Home
          </button>
          <button className="bg-white text-gray-950 px-4 py-3 rounded-sm w-fit">
            @alex
          </button>
        </div>
        {/* <img className="w-20 h-20" /> */}
        <div className="w-20 gap-20 bg-gray-900">pic</div>
      </div>
    </div>
  );
};

export default Nav;

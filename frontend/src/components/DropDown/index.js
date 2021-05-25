import { useEffect, useState } from "react";

function DropDown() {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuFunc = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false)
    document.removeEventListener("click", closeMenu)
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("click", closeMenu);
    }
    //   : document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div>
      <button onClick={(e) => showMenuFunc()}>Show menu</button>

      {showMenu ? (
        <div className="menu">
          <button> Menu item 1 </button>
          <button> Menu item 2 </button>
          <button> Menu item 3 </button>
        </div>
      ) : null}
    </div>
  );
}

export default DropDown;

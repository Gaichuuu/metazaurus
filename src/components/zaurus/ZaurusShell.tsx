import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { CategorySidebar } from "./CategorySidebar";
import { SearchModal } from "./SearchModal";
import { TitleBar } from "./TitleBar";

export function ZaurusShell() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-zaurus-shell-mid p-2">
      <div className="lcd-bezel flex-1 flex flex-col overflow-hidden relative">
        <TitleBar onSearchClick={() => setSearchOpen(true)} />
        <div className="lcd-screen flex-1 flex overflow-hidden">
          <CategorySidebar />
          <div className="corrupted-content flex-1 overflow-hidden relative">
            <Outlet />
          </div>
        </div>
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      </div>
    </div>
  );
}

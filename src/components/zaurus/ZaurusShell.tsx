import { Outlet } from "react-router-dom";
import { CategorySidebar } from "./CategorySidebar";
import { TitleBar } from "./TitleBar";

export function ZaurusShell() {
  return (
    <div className="flex flex-col w-full h-full bg-zaurus-shell-mid p-2">
      <div className="lcd-bezel flex-1 flex flex-col overflow-hidden">
        <TitleBar />
        <div className="lcd-screen flex-1 flex overflow-hidden">
          <CategorySidebar />
          <div className="corrupted-content flex-1 overflow-hidden relative">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

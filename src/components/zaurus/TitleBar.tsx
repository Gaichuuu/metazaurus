import { Link } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import { SearchIcon } from "../icons/ZaurusIcons";

interface TitleBarProps {
  onSearchClick: () => void;
}

export function TitleBar({ onSearchClick }: TitleBarProps) {
  return (
    <div className="lcd-titlebar">
      <Link
        to="/"
        className="font-bold hover:opacity-80 transition-opacity flex items-center gap-2"
      >
        <img
          src={logoSvg}
          alt="MetaZaurus"
          className="h-5 w-auto"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(85%) sepia(20%) saturate(500%) hue-rotate(10deg) brightness(95%)",
          }}
        />
        MetaZaurus
      </Link>
      <button
        onClick={onSearchClick}
        className="lcd-btn search-titlebar-btn"
        aria-label="Search"
        title="Search (⌘K)"
      >
        <SearchIcon />
      </button>
    </div>
  );
}

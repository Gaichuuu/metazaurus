import { useLocation } from "react-router-dom";
import { ZaurusButton } from "./ZaurusButton";
import {
  UserIcon,
  MapIcon,
  GlobeIcon,
  KeyIcon,
  MagazineIcon,
  MangaIcon,
  BookIcon,
  FanBookIcon,
  CardIcon,
} from "../icons/ZaurusIcons";

interface Category {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: "characters", label: "Characters", path: "/characters", icon: <UserIcon /> },
  { id: "locations", label: "Locations", path: "/locations", icon: <MapIcon /> },
  { id: "world", label: "World", path: "/world", icon: <GlobeIcon /> },
  { id: "codex", label: "Codex", path: "/codex", icon: <KeyIcon /> },
  { id: "magazine", label: "Magazine", path: "/magazine", icon: <MagazineIcon /> },
  { id: "manga", label: "Manga", path: "/manga", icon: <MangaIcon /> },
  { id: "book", label: "Book", path: "/book", icon: <BookIcon /> },
  { id: "fanfic", label: "Fanfic", path: "/fanfic", icon: <FanBookIcon /> },
  { id: "cards", label: "Cards", path: "/cards", icon: <CardIcon /> },
];

export function CategorySidebar() {
  const location = useLocation();
  const currentCategory = location.pathname.split("/")[1] || "";

  return (
    <div className="lcd-sidebar lcd-sidebar-left">
      {categories.map((category) => (
        <ZaurusButton
          key={category.id}
          to={category.path}
          variant="category"
          style="lcd"
          active={currentCategory === category.id}
        >
          <span className="flex items-center gap-2">
            {category.icon}
            <span>{category.label}</span>
          </span>
        </ZaurusButton>
      ))}
    </div>
  );
}

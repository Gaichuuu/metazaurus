import { Link } from "react-router-dom";

interface ZaurusButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  active?: boolean;
  variant?: "default" | "icon" | "category";
  style?: "shell" | "lcd";
  className?: string;
}

export function ZaurusButton({
  children,
  onClick,
  to,
  active = false,
  variant = "default",
  style = "shell",
  className = "",
}: ZaurusButtonProps) {
  const baseClass = style === "lcd" ? "lcd-btn" : "zaurus-btn";
  const variantClass =
    variant === "icon"
      ? style === "lcd" ? "lcd-icon-btn" : "zaurus-icon-btn"
      : variant === "category"
        ? style === "lcd" ? "lcd-category-btn" : "zaurus-category-btn"
        : "";

  const classes = `${baseClass} ${variantClass} ${active ? "active" : ""} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

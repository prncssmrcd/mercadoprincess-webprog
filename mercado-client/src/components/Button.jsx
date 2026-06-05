import { Link } from "react-router-dom";

const variantClasses = {
  primary: "border-pink-700 bg-pink-600 text-white hover:bg-pink-700",
  secondary: "bg-pink-50 text-neutral-900 hover:bg-pink-100",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
  disabled = false,
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-2 border-neutral-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
    disabled ? "cursor-not-allowed opacity-60" : variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

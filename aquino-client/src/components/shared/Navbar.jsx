import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-[color:var(--text-h)] bg-[color:var(--text-h)] text-[color:var(--bg)]"
      : "border-transparent text-[color:var(--text)] hover:border-[color:var(--border)] hover:bg-[color:var(--accent-bg)] hover:text-[color:var(--text-h)]",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-[color:var(--border)] bg-[color:var(--bg)]/95 backdrop-blur h-[var(--header-height)]">
      <div className="mx-auto relative flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-md border-2 border-[color:var(--border)] bg-[color:var(--bg)]">
              <p className="text-sm font-semibold text-[color:var(--text-h)]">
                LOGO HERE
              </p>
            </div>
          </NavLink>
        </div>

        <nav className="hidden md:flex flex-1 justify-center items-center gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end w-32" />
      </div>
    </header>
  );
};

export default NavBar;

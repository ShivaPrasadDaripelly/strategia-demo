import { Link } from "react-router-dom";

function UserBadge() {
  return (
    <div className="flex items-center gap-3">
      <div className="leading-tight text-right">
        <div className="text-sm font-semibold text-slate-800">Monika</div>
        <div className="text-xs text-slate-500">Project Manager</div>
      </div>
      <svg
        className="h-5 w-5 text-slate-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm border-b">
      <div className="mx-auto max-w-screen-2xl px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded grid place-items-center bg-gradient-to-br from-sky-400 to-indigo-500 text-white font-bold shadow">
            <span>P</span>
          </div>
          <span className="text-lg font-bold tracking-wide bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
            PLANIFEST
          </span>
        </Link>
        {/* <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <Link to="/" className="hover:text-slate-900">Dashboard</Link>
        </nav> */}
        <UserBadge />
      </div>
    </header>
  );
}

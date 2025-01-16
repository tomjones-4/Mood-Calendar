import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Calendar, Settings, Mail } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          MoodTracker
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent/10"
            aria-label="Home"
          >
            <Calendar className="h-5 w-5" />
            <span className="hidden sm:inline">Calendar</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent/10"
            aria-label="Contact"
          >
            <Mail className="h-5 w-5" />
            <span className="hidden sm:inline">Contact</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent/10"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
            <span className="hidden sm:inline">Settings</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

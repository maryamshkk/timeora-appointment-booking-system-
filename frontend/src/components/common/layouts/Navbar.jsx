import { Link } from "react-router-dom";
import BackToHome from "../BackToHome";

function Navbar() {
  return (
    <nav className="h-16 bg-navy shadow-md px-6 md:px-12 flex items-center justify-between">
      <Link to="/" className="font-serif text-2xl text-beige no-underline">
        Timeora
      </Link>

      <div className="flex items-center gap-6">
        <BackToHome className="text-gray no-underline hover:text-gold transition" />
        <Link
          to="/login"
          className="text-xs font-bold tracking-wide text-gray uppercase no-underline hover:text-gold transition"
        >
          Login
        </Link>
        
      </div>
    </nav>
  );
}

export default Navbar;
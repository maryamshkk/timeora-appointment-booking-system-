import { Link } from "react-router-dom";
import BackToHome from "../BackToHome";

function Navbar() {
  return (
    <nav className="h-16 bg-beige shadow-lg shadow-navy/5 border-b border-navy/10 px-6 md:px-12 flex items-center justify-between">
      {/* Logo with italic serif font and navy color */}
      <Link to="/" className="font-serif italic text-2xl text-navy no-underline">
        Timeora
      </Link>
    
      <div className="flex items-center gap-6">
        <BackToHome className="text-navy no-underline hover:text-brown transition" />
        <Link
          to="/login"
          className="text-xs font-bold tracking-wide text-navy uppercase no-underline hover:text-brown transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
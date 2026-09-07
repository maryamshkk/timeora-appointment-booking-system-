import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-navy px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-serif font-bold text-beige text-xl no-underline">
          Timeora
        </span>

        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-xs text-gray no-underline hover:text-gold transition">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-xs text-gray no-underline hover:text-gold transition">
            Terms of Service
          </Link>
          <Link to="/help" className="text-xs text-gray no-underline hover:text-gold transition">
            Help Center
          </Link>
        </div>

        <p className="text-xs text-gray/80">
          © 2026 Timeora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
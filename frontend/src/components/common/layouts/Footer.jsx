import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-beige shadow-lg shadow-navy/5 border-t border-navy/10 px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo with italic serif font and navy color */}
        <span className="font-serif italic text-xl text-navy no-underline">
          Timeora
        </span>

        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-xs text-navy no-underline hover:text-brown transition">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-xs text-navy no-underline hover:text-brown transition">
            Terms of Service
          </Link>
          <Link to="/help" className="text-xs text-navy no-underline hover:text-brown transition">
            Help Center
          </Link>
        </div>

        <p className="text-xs text-navy/80">
          © 2026 Timeora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
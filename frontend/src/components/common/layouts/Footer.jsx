import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray/30 px-6 md:px-12 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo />

        <div className="flex items-center gap-6">
          <Link
            to="/privacy-policy"
            className="text-xs text-slate hover:text-navy transition"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms"
            className="text-xs text-slate hover:text-navy transition"
          >
            Terms of Service
          </Link>

          <Link
            to="/help"
            className="text-xs text-slate hover:text-navy transition"
          >
            Help Center
          </Link>
        </div>

        <p className="text-xs text-gray">
          © 2026 Timeora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

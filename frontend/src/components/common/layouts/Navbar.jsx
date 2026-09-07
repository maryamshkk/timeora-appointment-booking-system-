import { Link } from "react-router-dom"; 
import Logo from "../common/Logo";
import BackToHome from "../BackToHome";

function Navbar() {

    return(
        <nav className="h-16 bg-white border-b border-gray/30 px-6 md:px-12 flex items-center justify-between">
            <Logo />

            <div className="flex items-center gap-6">
                <BackToHome />

                <Link to="/login"
                      className="text-sm text-slate hover:text-navy transition"  
                >
                </Link>
            </div>
        </nav>
    )
}
export default Navbar;
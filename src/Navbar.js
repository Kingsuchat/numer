import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 shadow-md rounded-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                
                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to="/"
                            className="text-white hover:bg-blue-800 px-3 py-2 rounded transition duration-200"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Bisection"
                            className="text-white hover:bg-blue-800 px-3 py-2 rounded transition duration-200"
                        >
                            Bisection
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/FalsePosition"
                            className="text-white hover:bg-blue-800 px-3 py-2 rounded transition duration-200"
                        >
                            False Position
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Onepoint"
                            className="text-white hover:bg-blue-800 px-3 py-2 rounded transition duration-200"
                        >
                            Onepoint
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Newton"
                            className="text-white hover:bg-blue-800 px-3 py-2 rounded transition duration-200"
                        >
                            Newton
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Solution"
                            className="text-white hover:bg-blue-800 px-3 py-2 rounded transition duration-200"
                        >
                            Solution
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

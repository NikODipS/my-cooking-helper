import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<header className="bg-blue-600">
			<div className="container flex justify-center items-center">
				<nav className="flex gap-4 text-blue-200 py-4">
					<NavLink
						to="/"
						exact
						className="py-2 px-4 hover:bg-blue-800 text-4xl cool-text rounded-lg"
						activeClassName="text-white bg-blue-700"
					>
						CHome
					</NavLink>
					<NavLink
						to="/recipe"
						exact
						className="py-4 px-4 hover:bg-blue-700 rounded-lg"
						activeClassName="text-white bg-blue-700"
					>
						Recipe
					</NavLink>
				</nav>
			</div>
		</header>
	);
}

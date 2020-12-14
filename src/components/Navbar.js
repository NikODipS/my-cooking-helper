import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<header className="bg-red-600">
			<div className="container flex justify-center items-center">
				<nav className="flex gap-4 text-red-200 py-4">
					<NavLink
						to="/"
						exact
						className="py-2 px-4 hover:bg-red-800 text-4xl cool-text rounded-lg"
						activeClassName="text-white bg-red-700"
					>
						CHome
					</NavLink>
					<NavLink
						to="/recipe" exact
						className="py-4 px-4 hover:bg-red-700 rounded-lg"
						activeClassName="text-white bg-red-700"
					>
						Recipe
					</NavLink>
				</nav>
			</div>
		</header>
	);
}

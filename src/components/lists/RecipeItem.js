import React from "react";
import { Link } from "react-router-dom";
import { difficultyIcons } from "../../constants/recipeConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

export default function Recipe(props) {
	const difficultyIcon = Object.keys(difficultyIcons).includes(
		props.recipe.difficulty
	)
		? difficultyIcons[props.recipe.difficulty]
		: ["fas", "flask"];
	const ingredientsCount = props.recipe.ingredients.length;
	return (
		<article>
			<div className="group relative h-64 w-full rounded-md overflow-hidden shadow-lg">
				<img
					src={props.recipe.mainImage.asset.url}
					alt={props.recipe.mainImage.alt}
					className="absolute w-full h-full object-cover"
				/>
				<div className="relative z-10 h-full w-full flex flex-col items-center overflow-hidden">
					<div className="absolute right-0 h-full w-16 transform translate-x-full group-hover:translate-0 flex items-end justify-end opacity-25 group-hover:opacity-75 transition-all duration-300 p-4">
						<div className="flex flex-col gap-4 items-center">
							<span className="block w-8 rounded-lg py-1 px-2 text-center text-black text-blue-900 rounded bg-gray-200">
								<FontAwesomeIcon icon={difficultyIcon} />
							</span>
							<span className="relative block w-8 font-bold rounded-lg py-1 px-2 text-center text-black text-blue-900 rounded bg-gray-200">
								<span className="absolute right-0 top-0 transform -translate -translate-y-2 translate-x-2">
									<FontAwesomeIcon icon={faClock} />
								</span>
								{props.recipe.timing}
							</span>

							<span className="relative block w-8 font-bold rounded-lg py-1 px-2 text-center text-black text-blue-900 rounded bg-gray-200">
								<span className="absolute right-0 top-0 transform -translate -translate-y-3 translate-x-2">
									<FontAwesomeIcon
										icon={faBoxOpen}
										className="text-xs"
									/>
								</span>
								{ingredientsCount}
							</span>
						</div>
					</div>
					<div className="flex-grow flex items-center">
						<Link
							to={`/recipe/${props.recipe.slug.current}`}
							key={props.recipe.slug.current}
						>
							<h2 className="text-xl cool-text p-6 rounded bg-green-100 opacity-75 hover:opacity-100">
								{props.recipe.title}
							</h2>
						</Link>
					</div>
				</div>
			</div>
		</article>
	);
}

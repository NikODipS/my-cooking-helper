import React, { useState, useEffect } from "react";
import sanityClient from "../client";
import RecipeItem from "./lists/RecipeItem";

export default function Recipe() {
	const [recipeData, setRecipeData] = useState(null);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "recipe" && public ]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                },
                timing,
				difficulty,
				ingredients
            }`
			)
			.then(setRecipeData)
			.catch(console.error);
	}, []);

	if (!recipeData) return <h1>Loading ...</h1>;

	return (
		<main className="bg-blue-100 min-h-screen p-10">
			<section className="container mx-auto">
				<h1 className="text-6xl flex justify-center cool-text">
					Tutte le ricette
				</h1>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{recipeData &&
						recipeData.map((recipe, index) => (
							<RecipeItem recipe={recipe} key={index} />
						))}
				</div>
			</section>
		</main>
	);
}

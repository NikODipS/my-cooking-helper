import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client";

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
                difficulty
            }`
			)
			.then(setRecipeData)
			.catch(console.error);
	}, []);

	if (!recipeData) return <h1>Loading ...</h1>;
	console.log(recipeData);
	return (
		<main className="bg-green-200 min-h-screen p-10">
			<section className="container mx-auto">
				<h1 className="text-6xl flex justify-center cool-text">
					Tutte le ricette
				</h1>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{recipeData &&
						recipeData.map((recipe, index) => (
							<article key={index}>
								<Link
									to={`/recipe/${recipe.slug.current}`}
									key={recipe.slug.current}
								>
									<div className="group relative h-64 w-full rounded-md overflow-hidden shadow-lg">
										<img
											src={recipe.mainImage.asset.url}
											alt={recipe.mainImage.alt}
											className="absolute w-full h-full object-cover"
										/>
										<div className="relative z-10 h-full w-full flex flex-col items-center">
											<div className="flex-grow flex items-center">
												<h2 className="text-xl cool-text p-6 rounded bg-green-100 opacity-75">
													{recipe.title}
												</h2>
											</div>
											<p className="h-16 bg-red-700 w-full flex items-center justify-end opacity-25 group-hover:opacity-75 transition-all duration-300 px-4">
												<span className="block rounded-lg py-1 px-2 text-black text-blue-900 rounded bg-gray-200">
													{recipe.difficulty}
												</span>
											</p>
										</div>
									</div>
								</Link>
							</article>
						))}
				</div>
			</section>
		</main>
	);
}

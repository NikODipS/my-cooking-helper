import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import { useParams } from "react-router-dom";

import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { difficultyIcons } from "../constants/recipeConstants";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
	return builder.image(source);
}

export default function SingleRecipe() {
	const [singleRecipe, setRecipeData] = useState(null);
	const { slug } = useParams();

	useEffect(() => {
		sanityClient
			.fetch(
				`*[slug.current == "${slug}" ]{
                title,
				slug,
				"authorName": author->name,
				"authorImage": author->image,
                mainImage,
				people,
                timing,
				difficulty,
				ingredients[]{
					_key,
					quantity,
					notes,
					ingredient->
				},
				body,
				categories[]->
            }`
			)
			.then((data) => setRecipeData(data[0]))
			.catch(console.error);
	}, [slug]);

	if (!singleRecipe) return <h1>Loading ...</h1>;

	const difficultyIcon = Object.keys(difficultyIcons).includes(
		singleRecipe.difficulty
	)
		? difficultyIcons[singleRecipe.difficulty]
		: ["fas", "flask"];

	return (
		<main className="bg-blue-100 min-h-screen p-10">
			<article className="container mx-auto shadow-md rounded-md bg-white">
				<header className="relative">
					<div className="absolute h-full w-full flex flex-col md:flex-row items-center justify-between">
						<div class="flex-grow flex items-center justify-center p-8">
							<div className="bg-white bg-opacity-75 rounded p-12">
								<h1 className="cool-text text-center text-2xl lg:text-6xl mb-4">
									{singleRecipe.title}
								</h1>
								<div className="flex gap-4 items-center justify-center text-gray-800">
									<img
										className="rounded-full h-10 w-10"
										src={urlFor(singleRecipe.authorImage)
											.width(60)
											.height(60)
											.url()}
										alt={singleRecipe.authorName}
									/>
									<p className="cool-text text-2xl">
										{singleRecipe.authorName}
									</p>
								</div>
							</div>
						</div>
						<div class="ml-auto right-0 md:h-full w-full md:w-64 bg-gray-200 opacity-100 md:opacity-50 md:hover:opacity-75 text-gray-600 md:text-gray-900">
							<ul className="flex flex-row flex-wrap md:flex-col justify-between items-center md:items-stretch md:text-right p-4 md:p-8 h-full">
								<li className="flex items-center gap-2 md:block">
									<div className="hidden md:block text-sm font-semibold">
										Tempo di Preparazione
									</div>
									<div className="font-bold text-xs md:text-xl">
										{singleRecipe.timing} Minuti{" "}
										<FontAwesomeIcon icon={faClock} />
									</div>
								</li>
								<li className="flex items-center gap-2 md:block">
									<div className="hidden md:block text-sm font-semibold">
										Difficoltà
									</div>
									<div className="font-bold text-xs md:text-xl capitalize">
										{singleRecipe.difficulty}{" "}
										<FontAwesomeIcon
											icon={difficultyIcon}
										/>
									</div>
								</li>
								<li className="flex items-center gap-2 md:block">
									<div className="hidden md:block text-sm font-semibold">
										Porzioni
									</div>
									<div className="font-bold text-xs md:text-xl">
										{singleRecipe.people}{" "}
										<FontAwesomeIcon icon={faUsers} />
									</div>
								</li>
								<li className="mt-4 mb-2 w-full col-span-3 flex items-center gap-2 md:block">
									<div className="text-sm font-semibold">
										Categorie
										<span class="inline md:hidden">:</span>
									</div>
									<div className="font-bold text-xs md:text-lg capitalize">
										<ul className="flex gap-4 md:block">
											{singleRecipe.categories &&
												singleRecipe.categories.map(
													(category) => (
														<li key={category._id}>
															{category.title}
														</li>
													)
												)}
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<img
						className="w-full object-cover rounded-t"
						src={urlFor(singleRecipe.mainImage).height(500).url()}
						style={{ height: "500px" }}
						alt="null"
					/>
				</header>
				<div className="pl-16 pr-8 lg:px-48 pt-12 lg:pt-20 prose lg:prose-xl max-w-full">
					<h1 class="text-2xl cool-text">Cosa Serve</h1>
					<ul>
						{singleRecipe.ingredients &&
							singleRecipe.ingredients.map(
								({ quantity, notes, ingredient, _key }) => (
									<li key={_key}>
										<div className="relative flex items-center">
											<img
												className="custom-image rounded-full"
												style={{ margin: "0px" }}
												src={urlFor(
													ingredient.mainImage
												)
													.width(25)
													.height(25)
													.url()}
												alt={ingredient.name}
											/>
											<div className="pl-2">
												{`${quantity} di ${ingredient.name}`}
												{notes && (
													<span>
														{" - "}
														{notes}
													</span>
												)}
											</div>
										</div>
									</li>
								)
							)}
					</ul>
				</div>
				<div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
					<h1 class="text-2xl cool-text">La Ricetta</h1>
					<BlockContent
						blocks={singleRecipe.body}
						projectId="7oasb573"
						dataset="production"
					/>
				</div>
			</article>
		</main>
	);
}

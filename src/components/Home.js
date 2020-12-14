import React from "react";
import cooking from "../cooking.jpg";

export default function Home() {
	return (
		<main>
			<img
				src={cooking}
				alt="Let's Cook Something"
				className="absolute object-cover w-full h-full"
			/>
			<section className="relative min-h-screen flex items-center justify-center">
				<hi className="text-huge text-green-900 font-bold cool-text leading-none lg:leading-snug bg-green-200 bg-opacity-25 px-4 rounded-xl">
					Let's Cook Something!
				</hi>
			</section>
		</main>
	);
}

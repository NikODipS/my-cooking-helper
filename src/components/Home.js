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
				<hi className="text-huge text-blue-900 font-bold cool-text leading-none lg:leading-snug bg-blue-200 bg-opacity-50 px-8 py-2 rounded-xl">
					Let's Cook Something!
				</hi>
			</section>
		</main>
	);
}

import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SingleRecipe from "./components/SingleRecipe";
import Recipe from "./components/Recipe";
import Navbar from "./components/Navbar";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route component={Home} path="/" exact />
				<Route component={SingleRecipe} path="/recipe/:slug" />
				<Route component={Recipe} path="/recipe" />
			</Switch>
		</BrowserRouter>
	);
}

export default App;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MoviesList from './components/movies/MoviesList';
import MovieCharacters from './components/movies/MovieCharacters';

const Router = () => (
	<>
		<Switch>
			<Route exact path="/movies" component={MoviesList} />
			<Route exact path="/movies/:movieID/characters" component={MovieCharacters} />
			<Redirect from="/" to="/movies" />
		</Switch>
	</>
);

export default Router;
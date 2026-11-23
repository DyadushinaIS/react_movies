import React from 'react';
import './Main.css';
import MovieList from '../components/MovieList';
import Preloader from '../components/Preloader';
import Search from '../components/Search';

class Main extends React.Component
{
	state =
		{
			movies:[]
		}
	componentDidMount()
	{
		//эта функция неявно вызывается всякий раз, когда компонент смонтировался на странице
		fetch('https://www.omdbapi.com/?s=The%20Transporter&apikey=365ae90a')
			.then(response => response.json())
			.then(data => this.setState({movies:data.Search}))
	}
	searchMovie = (str) =>
	{
		fetch(`https://www.omdbapi.com/?s=${str}&apikey=365ae90a`)
			.then(response => response.json())
			.then(data => this.setState({ movies: data.Search }))
	}
	render()
	{
		return (
			<main>
				<Search searchMovie={ this.searchMovie} />
				{
					this.state.movies != null ? <h1>Введите поисковый запрос</h1>:
					this.state.movies.length == 0 ?
					<Preloader /> :
					<MovieList movies={this.state.movies} />					
				}
			</main>
		)
	}
}
export default Main;
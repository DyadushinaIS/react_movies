import './Search.css';
import React from 'react';

class Search extends React.Component {
	state =
		{
			search: "",
			type: "all",
			page: 1
		}
	handleKey = (event) => {
		if (event.key === 'Enter') {
			this.props.searchMovie(this.state.search, this.state.type);
		}
	}
	handlerFilter = (event) => {
		this.setState
			(
				() => ({ type: event.target.dataset.type }),
				() => this.props.searchMovie(this.state.search, this.state.type)
			)
	}
	prevPage = () => {
		this.setState
			(
				() => (this.state.page > 1 ? { page: this.state.page - 1 } : { page: 1 }),
				() => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
			)
	}
	nextPage = () => {
		this.setState
			(
				() => ({ page: this.state.page + 1 }),
				() => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
			)
	}
	setPage = (num) => {
		this.setState
			(
				() => ({ page: num }),
				() => this.props.searchMovie(this.state.search, this.state.type, this.state.page)
			);
	}
	render() {
		let itemsPerPage = 10;
		let totalPages = Math.ceil (this.props.totalItems / itemsPerPage); //округление вверх
		const pagesCount = 10; // сколько кнопок-страниц показываем
		let firstIndex, lastIndex;

		if (totalPages <= pagesCount) {
			firstIndex = 1;
			lastIndex = totalPages + 1;
		} else {
			firstIndex = this.state.page - Math.floor(pagesCount / 2);
			if (firstIndex < 1) firstIndex = 1;
			if (firstIndex + pagesCount - 1 > totalPages) {
				firstIndex = totalPages - pagesCount + 1;
			}
			lastIndex = firstIndex + pagesCount;
		}

		let num = [];
		for (let i = 1; i < totalPages; i++) {
			num.push(i);
		}
		return (
			<div>
				<div className="search">
					<input type='search'
						placeholder="Поиск"
						value={this.state.search}
						onChange={(e) => this.setState({ search: e.target.value })}
						onKeyDown={this.handleKey}
					/>
					<button onClick={() => this.props.searchMovie(this.state.search, this.state.type)} className="btn">
						Поиск
					</button>
				</div>
				<div className='radio'>
					<label><input type='radio' name='category' data-type='all' checked={this.state.type === 'all'} onChange={this.handlerFilter} /> All</label>
					<label><input type='radio' name='category' data-type='movie' checked={this.state.type === 'movie'} onChange={this.handlerFilter} /> Movie</label>
					<label><input type='radio' name='category' data-type='series' checked={this.state.type === 'series'} onChange={this.handlerFilter} /> Series</label>
					<label><input type='radio' name='category' data-type='game' checked={this.state.type === 'game'} onChange={this.handlerFilter} /> Game</label>
				</div>
				<div className="pagination">
					<button className="btn" onClick={this.prevPage}>Prev</button>
					<div className="page-numbers">
						{
							num.slice(firstIndex-1, lastIndex-1).map
								(
									(element, index) =>
									(
										<button
											key={element}
											className={ `btn ${element===this.state.page?'btn-active':''}`}
											onClick={() => this.setPage(element)}
										>
											{element}
										</button>
									)
								)
						}
					</div>
					<button className="btn" onClick={this.nextPage}>Next</button>
				</div>
			</div>
		)
	}
}
export default Search;
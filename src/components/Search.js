import './Search.css';
import React from 'react';

class Search extends React.Component
{
    state =
        {
            search: ""
        }
    handleKey = (event) =>
    {
        if (event.key === 'Enter')
        {
            this.props.searchMovie(this.state.search)
        }
    }
    render()
    {
        return (
            <div className="search">
                <input type='search'
                    placeholder="Поиск"
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                    onKeyUp={this.handleKey }
                />
                <button onClick={() => this.props.searchMovie(this.state.search)}>
                    Поиск
                </button>
            </div>
        )
    }
}
export default Search;
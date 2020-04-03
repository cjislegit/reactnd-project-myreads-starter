import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import Book from './Book';

class Search extends Component {
  state = {
    query: '',
    result: []
  };

  changeQuery = e => {
    this.setState({
      query: e.target.value
    });

    BooksAPI.search(e.target.value).then(result => {
      console.log(result);
      if (result) {
        this.setState(() => ({
          result
        }));
      } else {
        this.setState({
          result: []
        });
      }
    });
  };

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type='text'
              placeholder='Search by title or author'
              value={this.state.query}
              onChange={e => this.changeQuery(e)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.result.length > 0
              ? this.state.result.map(book => (
                  <Book
                    imageLinks={book.imageLinks || './icons/nc-md.gif'}
                    title={book.title}
                    authors={book.authors}
                    shelf='none'
                  />
                ))
              : null}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

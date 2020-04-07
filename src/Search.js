import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import SearchResult from './SearchResult';

class Search extends Component {
  state = {
    query: '',
    result: [],
  };

  changeQuery = (e) => {
    this.setState({
      query: e.target.value,
    });

    BooksAPI.search(e.target.value).then((result) => {
      //Checks if there is a result for the query and if it is an array
      if (Array.isArray(result)) {
        //For each result it compares it to the books state from the App component
        result.forEach((result) => {
          //Checks if the result.id is in the books array and saves the index to bookIndex
          let bookIndex = this.props.books.findIndex(
            (book) => book.id === result.id
          );
          //If the bookIndex is greater than -1 it updates the shelf from the state
          if (bookIndex > -1) {
            result.shelf = this.props.books[bookIndex].shelf;
            //Else it sets it to none
          } else {
            result.shelf = 'none';
          }
        });
        //Adds result to state if it is not blank
        this.setState(() => ({
          result,
        }));
      } else {
        //If result is blank it sets to empty array
        this.setState({
          result: [],
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
              onChange={(e) => this.changeQuery(e)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {/* Checks if result is not empty before running .map */}
            {this.state.result.length > 0
              ? this.state.result.map((book) => (
                  <SearchResult
                    key={book.id}
                    addBook={this.props.addBook}
                    book={book}
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

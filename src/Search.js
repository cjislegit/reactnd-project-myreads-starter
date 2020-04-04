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
      //Checks if there is a result for the query
      if (result) {
        //For each result it compres it to the books state from the App component
        result.forEach(result => {
          this.props.books.forEach(book => {
            //If a quesry result has the same id it ads the shelf property from book state else sets it to none
            if (book.id === result.id) {
              result.shelf = book.shelf;
            } else {
              result.shelf = 'none';
            }
          });
        });
        //Adds result to state if it is not blank
        this.setState(() => ({
          result
        }));
      } else {
        //If result is blank it sets to empty array
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
            {/* Checks if result is not empty before running .map */}
            {this.state.result.length > 0
              ? this.state.result.map(book => (
                  <Book
                    //If the book as no imageLins the proerty is set to './icons/nc-md.gif'
                    imageLinks={book.imageLinks || './icons/nc-md.gif'}
                    title={book.title}
                    authors={book.authors}
                    shelf={book.shelf}
                    key={book.id}
                    changeStatus={this.props.changeStatus}
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

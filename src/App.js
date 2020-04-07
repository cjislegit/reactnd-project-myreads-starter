import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';

import Search from './Search';
import BookList from './BookList';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  onChange = (e, id) => {
    //Finds the index of the book being updated by comparing IDs
    let index = this.state.books.findIndex((e) => e.id === id);
    //Copies the state to newBooks
    let newBooks = this.state.books;
    //Updates the shelf on the book with the matching ID
    newBooks[index].shelf = e;
    //Updates the state
    this.setState({
      books: newBooks,
    });
    //Updates the API
    BooksAPI.update({ id: id }, e);
  };

  componentDidMount() {
    //Gets the books from the API and saves them to state
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  addBook = (e, newBook) => {
    //Updates the shelf key with new value
    newBook.shelf = e;
    //Copies state to newBooks
    let newBooks = this.state.books;
    //Adds the new book to newBooks array
    newBooks.push(newBook);
    //Updates state
    this.setState({
      books: newBooks,
    });
    //Updates API with new book
    BooksAPI.update(newBook, e);
  };

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <BookList books={this.state.books} changeStatus={this.onChange} />
          )}
        />
        <Route
          exact
          path='/search'
          render={() => (
            <Search books={this.state.books} addBook={this.addBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

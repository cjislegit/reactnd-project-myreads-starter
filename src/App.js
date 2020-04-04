import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';

import Search from './Search';
import BookList from './BookList';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  onChange = (e, id) => {
    let index = this.state.books.findIndex(e => e.id === id);
    let newBooks = this.state.books;
    newBooks[index].shelf = e;
    this.setState({
      books: newBooks
    });
    BooksAPI.update({ id: id }, e);
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

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
          render={() => <Search books={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;

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
        <Route exact path='/' component={BookList} />
        <Route exact path='/search' component={Search} />
      </div>
    );
  }
}

export default BooksApp;

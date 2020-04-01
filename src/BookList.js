import React from 'react';
import { Link } from 'react-router-dom';

import Shelf from './Shelf';

const BookList = props => {
  let { books, changeStatus } = props;
  let currentlyReading = books.filter(
    book => book.shelf === 'currentlyReading'
  );
  let wantToRead = books.filter(book => book.shelf === 'wantToRead');
  let read = books.filter(book => book.shelf === 'read');
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <Shelf
            shelfName='Currently Reading'
            books={currentlyReading}
            changeStatus={changeStatus}
          />
          <Shelf shelfName='Want to Read' books={wantToRead} />
          <Shelf shelfName='Read' books={read} />
        </div>
      </div>
      <Link to='/search'>
        <div className='open-search'>
          <button>Add a book</button>
        </div>
      </Link>
    </div>
  );
};

export default BookList;

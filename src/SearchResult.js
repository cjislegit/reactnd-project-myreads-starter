import React from 'react';

import defaultBackground from './icons/nc-md.gif';

const SearchResult = (props) => {
  let { book, addBook } = props;

  //Checks if there is a thumbnail img
  let bookBackground = book.imageLinks
    ? //IF there is variable is set to it
      book.imageLinks.thumbnail
    : //If not a default img from the icons folder goes in the variable
      defaultBackground;

  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${bookBackground}")`,
              backgroundSize: 'cover',
            }}
          ></div>
          <div className='book-shelf-changer'>
            <select
              value={book.shelf}
              onChange={(e) => addBook(e.target.value, book)}
            >
              <option value='move' disabled>
                Move to...
              </option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        <div className='book-authors'>
          {book.authors ? book.authors.join(', ') : book.authors}
        </div>
      </div>
    </li>
  );
};

export default SearchResult;

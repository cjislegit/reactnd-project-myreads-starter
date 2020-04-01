import React from 'react';
import Book from './Book';

const Shelf = props => {
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{props.shelfName}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {props.books.map(book => (
            <Book
              key={book.id}
              title={book.title}
              authors={book.authors}
              imageLinks={book.imageLinks}
              shelf={book.shelf}
              changeStatus={props.changeStatus}
              id={book.id}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Shelf;

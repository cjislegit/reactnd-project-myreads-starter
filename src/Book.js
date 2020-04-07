import React from 'react';

import defaultBackground from './icons/nc-md.gif';

const Book = (props) => {
  //Checks if there is a thumbnail img
  let bookBackground = props.imageLinks
    ? //IF there is variable is set to it
      props.imageLinks.thumbnail
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
              value={props.shelf}
              onChange={(e) => props.changeStatus(e.target.value, props.id)}
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
        <div className='book-title'>{props.title}</div>
        <div className='book-authors'>
          {props.authors ? props.authors.join(', ') : props.authors}
        </div>
      </div>
    </li>
  );
};

export default Book;

import React from 'react';
import ShelfChanger from './ShelfChanger';

class Shelf extends React.Component
{
    render()
    {
        return(
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.name}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {this.props.shelf.map(book =>  (
                                    <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                            <ShelfChanger book={book} currentShelf={this.props.currentShelf} onShelfUpdate={this.props.onShelfUpdate}/>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                    </li>
                                ))}
                            </ol>
                        </div>                    
                </div>
            </div>
        )
    }
}

export default Shelf;
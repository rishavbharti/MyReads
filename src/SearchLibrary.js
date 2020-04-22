import React from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom';
import ShelfChanger from './ShelfChanger';

class SearchLibrary extends React.Component
{
    state={
        query:'',
        queryResult: []
    }
    searchTerms=['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    
    handleSearch=e=>{
        this.setState({query: e.target.value})     
        const queryFilter=this.searchTerms.filter(term=>term.toLowerCase().includes(this.state.query.trim()))
        if(this.state.query.length>0 && queryFilter.length!==0)
        {
            BooksAPI.search(this.state.query.trim())
                    .then((response) => 
                    {
                        if (!response.error && response.length!==undefined)
                        {
                            response.map(book => (this.props.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
                            this.setState({queryResult: response})
                        }
                    })
        }     
    }
    render()
    {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className="close-search"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                        value={this.state.query}
                        onChange={this.handleSearch}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.queryResult.length!==undefined ? (this.state.queryResult.map((book)=>(       
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks? book.imageLinks.thumbnail: ''})` }}></div>
                                        {!book.hasOwnProperty('shelf') ? book.shelf='none' : ''}
                                        <ShelfChanger book={book} currentShelf={book.shelf} onShelfUpdate={this.props.onShelfUpdate}/>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))) : (
                            <h2>No result found</h2>
                        )}
                    </ol>
                </div>
          </div>
        )
    }
}

export default SearchLibrary;
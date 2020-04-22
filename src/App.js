import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route, Link} from 'react-router-dom';
import SearchLibrary from './SearchLibrary';
import Shelf from './Shelf';

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  reRenderScreen=async ()=>
  {
    await BooksAPI.getAll()
      .then((response)=>this.setState({books:response}))
      .then(()=>{
        this.state.books.forEach((book) => {
          switch(book.shelf)
          {
            case 'currentlyReading': {this.setState(currentState => ({currentlyReading: currentState.currentlyReading.concat([book]) }))}
                                      break;
            case 'wantToRead': {this.setState(currentState => ({wantToRead: currentState.wantToRead.concat([book]) }))}
                                      break;    
            case 'read': {this.setState(currentState => ({read: currentState.read.concat([book]) }))}
                                      break;    
            default:               
          }
        })
      })
  }

  componentDidMount()
  {
    this.reRenderScreen();
  }

  
  toUpdateShelf=async (book, shelf)=>
  {
    await BooksAPI.update(book, shelf)
    .then(()=>{
      book.shelf = shelf;
      this.setState(currentState => ({
        books: currentState.books.filter(b => b.id !== book.id).concat([book])
      }));
      this.setState({
        currentlyReading: [],
        wantToRead: [],
        read: []
        })
      
    })
    .then(this.reRenderScreen)
  }

  render() 
  {
      return (
      <div className="app">
        <Route exact path='/'>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>                 
                    <Shelf shelf={this.state.currentlyReading} currentShelf={'currentlyReading'} name={'Currently Reading'} onShelfUpdate={this.toUpdateShelf}/>
                    <Shelf shelf={this.state.wantToRead} currentShelf={'wantToRead'} name={'Want To Read'} onShelfUpdate={this.toUpdateShelf}/>
                    <Shelf shelf={this.state.read} currentShelf={'read'} name={'Read'} onShelfUpdate={this.toUpdateShelf}/>
                </div>
              </div>            
            </div>  
            <Link to='/search' className="open-search">
              <button>Add a book</button>
            </Link>            
          </Route>
          <Route exact path='/search' render={()=><SearchLibrary books={this.state.books} onShelfUpdate={this.toUpdateShelf}/>}/>
      </div>
    )
  }
}
export default BooksApp
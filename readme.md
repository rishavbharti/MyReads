# MyReads Project

MyReads is a bookshelf app that allows the user to select and categorize books they have read, are currently reading, or
want to read.

## Demo



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing 
purposes. 

### Prerequisites

The project can be built with npm or yarn, so choose one of the approach bellow in case you don't 
have any installed on your system. 

* npm is distributed with Node.js which means that when you download Node.js, 
you automatically get npm installed on your computer. [Download Node.js](https://github.com/facebookincubator/create-react-app)

or

* Yarn is a package manager built by Facebook Team and seems to be faster than npm in general.  [Download Yarn](https://yarnpkg.com/en/docs/install)

### Installing

To download the project follow the instructions bellow

```
git clone https://github.com/rishavbharti/MyReads
cd myreads
```

Install dependencies and run with:
 
npm
```
npm install
npm start
```
or

yarn
```
yarn install
yarn start
```

### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can 
be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend,
so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
import 'babel-polyfill';
import 'airbnb-browser-shims';

import 'sanitize.css/sanitize.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// global styles
import styles from './style.scss';

const results = require('../../results.js');


class Show extends React.Component {
  render() {
    return (
      <div className={styles.show}>
        <img src={this.props.image} />
        <p className="option__text">{this.props.show}</p>
      </div>
    )
  }
}


class Search extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let shows = [];
    if (this.props.query != null) {
      for (var i=0; i<this.props.results.length; i++) {
        if (this.props.results[i].show.name.toLowerCase().includes(this.props.query.toLowerCase())) {
          shows.push(
            <Show show={this.props.results[i].show.name} image={this.props.results[i].show.image.medium}/>
          )
        }
      }
    } else {
      for (var i=0; i<this.props.results.length; i++) {
        shows.push(
          <Show show={this.props.results[i].show.name} image={this.props.results[i].show.image.medium}/>
        )
      }
    }

    return (
      <div>
        <form onSubmit={this.props.handleClick}>
          <input type="text" name="search"></input>
          <button>Search</button>
        </form>
        <div>
          <button onClick={this.props.handleSort}>Sort by Name</button>
        </div>
        <div>{shows}</div>
        {/*
        {this.props.results.map((show) => <Show show={show.show.name} image={show.show.image.medium}/>)}
        */}
      </div>
    )
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      results,
      keyword: null,
      sortByName: true
    }
  }

  handleClick(event) {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value.trim();
    this.setState({keyword: searchTerm});
  }

  handleSort() {
    let sortedResults;
    if (this.state.sortByName) {
      sortedResults = [].concat(this.state.results).sort((a,b) => {
        if (a.show.name > b.show.name) {
          return 1;
        } else if (a.show.name < b.show.name) {
          return -1;
        }
      })
    } else {
      sortedResults = [].concat(this.state.results).sort((a,b) => {
        if (a.show.name > b.show.name) {
          return -1;
        } else if (a.show.name < b.show.name) {
          return 1;
        }
      })
    }

    this.setState({ sortByName: !this.state.sortByName, results: sortedResults })
  }

  render() {
    return (
      <div>
        <Search handleClick={this.handleClick} results={this.state.results} query={this.state.keyword} handleSort={this.handleSort}/>
      </div>
    )
  }
}

ReactDOM.render(<Home />, document.getElementById('app'));

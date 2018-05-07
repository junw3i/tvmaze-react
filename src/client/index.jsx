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
    this.state = {
      results,
      keyword: null
    }
  }

  handleClick(event) {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value.trim();
    this.setState({keyword: searchTerm});
  }

  render() {
    return (
      <div>
        <Search handleClick={this.handleClick} results={this.state.results} query={this.state.keyword}/>
      </div>
    )
  }
}

ReactDOM.render(<Home />, document.getElementById('app'));

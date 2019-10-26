import React, { Component } from "react";
import Quote from "./Quote";

class QuoteSearcher extends Component {
  state = {
    quotes: null,
    likes: 0,
    dislikes: 0,
    searchTerm: "",
    loading: true
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(res => res.json())
      .then(data => this.setState({ quotes: data.results, loading: false }))
      .catch(console.error);
  }

  search() {
    fetch(
      `https://quote-garden.herokuapp.com/quotes/search/${this.state.searchTerm}`
    )
      .then(res => res.json())
      .then(data => this.setState({ quotes: data.results, loading: false }))
      .catch(console.error);
  }

  handleSearch = event => {
    this.setState({ searchTerm: event.target.value });
    console.log("state: ", this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("submitted: ", this.state.searchTerm);
    this.setState({ searchTerm: "", loading: true });
    this.search();
  };

  addLike = () => {
    this.setState({ likes: this.state.likes + 1 });
  };

  addDisike = () => {
    this.setState({ dislikes: this.state.dislikes + 1 });
  };

  removeLike = () => {
    this.setState({ likes: this.state.likes - 1 });
  };

  removeDislike = () => {
    this.setState({ dislikes: this.state.dislikes - 1 });
  };

  render() {
    return (
      <div>
        <h1>Some Quotes</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Search:</label>
          <input
            type="text"
            className="searchField"
            value={this.state.searchTerm}
            onChange={this.handleSearch}
          />
          <button type="submit" value="Submit">
            Search
          </button>
        </form>
        {/* {!this.state.load && `Searched for: ${this.state.searchTerm}`} */}
        <h2>
          Liked: {this.state.likes} / Disliked: {this.state.dislikes}
        </h2>
        {this.state.loading && "Loadin'..."}
        {!this.state.loading &&
          this.state.quotes.map(quote => (
            <Quote
              quoteAuthor={quote.quoteAuthor}
              quoteText={quote.quoteText}
              key={quote._id}
              addLike={this.addLike}
              addDisike={this.addDisike}
              removeLike={this.removeLike}
              removeDislike={this.removeDislike}
            />
          ))}
      </div>
    );
  }
}

export default QuoteSearcher;

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
      .then(data => data.results)
      .then(quotes => this.getUniques(quotes))
      .then(uniqueQuotes =>
        this.setState({ quotes: uniqueQuotes, loading: false })
      )
      .catch(console.error);
  }

  getUniques = quotes => {
    const uniqueQuotes = Array.from(
      new Set(quotes.map(quote => quote.quoteText))
    ).map(quoteText => quotes.find(q => q.quoteText === quoteText));
    return uniqueQuotes;
  };

  search() {
    fetch(
      `https://quote-garden.herokuapp.com/quotes/search/${this.state.searchTerm}`
    )
      .then(res => res.json())
      .then(data => data.results)
      .then(quotes => this.getUniques(quotes))
      .then(uniqueQuotes =>
        this.setState({ quotes: uniqueQuotes, loading: false })
      )
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

  addOpinion(opinion) {
    if (opinion === "like") {
      this.setState({ likes: this.state.likes + 1 });
    } else {
      this.setState({ dislikes: this.state.dislikes + 1 });
    }
  }

  addLike = () => {
    this.setState({ likes: this.state.likes + 1 });
  };

  addDislike = () => {
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
              addDislike={this.addDislike}
              addOpinion={this.addOpinion}
              removeLike={this.removeLike}
              removeDislike={this.removeDislike}
            />
          ))}
      </div>
    );
  }
}

export default QuoteSearcher;

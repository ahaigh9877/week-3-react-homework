import React, { Component } from "react";
import Quote from "./Quote";

class QuoteSearcher extends Component {
  state = {
    quotes: null,
    likes: 0,
    dislikes: 0,
    searchTerm: "",
    previousSearches: [],
    loading: true,
    emptySearch: null,
    newQuote: "",
    newAuthor: "",
    newQuoteObj: { quoteAuthor: "", quoteText: "" },
    testArr: []
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

  checkEmpty = quoteArr => {
    console.log("checking empty");
    console.log(quoteArr);
    quoteArr.length < 1
      ? this.setState({ emptySearch: true })
      : this.setState({ emptySearch: false });
    console.log("state: ", this.state);
    return quoteArr;
  };

  search() {
    fetch(
      `https://quote-garden.herokuapp.com/quotes/search/${this.state.searchTerm}`
    )
      .then(res => res.json())
      .then(data => data.results)
      .then(quotes => this.getUniques(quotes))
      .then(quoteArray => this.checkEmpty(quoteArray))
      .then(uniqueQuotes =>
        this.setState({ quotes: uniqueQuotes, loading: false })
      )
      .catch(console.error);
  }

  handleSearch = event => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmitSearch = event => {
    event.preventDefault();

    this.setState({
      previousSearches: this.state.previousSearches.concat(
        this.state.searchTerm
      )
    });
    this.setState({ searchTerm: "", loading: true });
    this.search();
  };

  handleChangeAuthor = event => {
    const newAuthor = event.target.value;
    this.setState(prevState => ({
      newQuoteObj: {
        ...prevState.newQuoteObj,
        _id: Math.round(Math.random() * 100000),
        quoteAuthor: newAuthor
      }
    }));
  };

  handleChangeQuote = event => {
    const newQuote = event.target.value;
    this.setState(prevState => ({
      newQuoteObj: { ...prevState.newQuoteObj, quoteText: newQuote }
    }));
  };

  HandleSubmitQuote = event => {
    event.preventDefault();
    console.log("hello handle submit quote", this.state.newQuoteObj);
    const quoteToAdd = this.state.newQuoteObj;
    this.setState({ newQuoteObj: {} });
    this.setState({
      quotes: this.state.quotes.concat(quoteToAdd)
    });
    console.log("state after submit: ", this.state);
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

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    return (
      <main>
        <a href="." onClick={this.refreshPage}>
          <h1>QUOTINATOR</h1>
        </a>
        <form onSubmit={this.handleSubmitSearch}>
          <h2>Search for quotes:</h2>
          <input
            type="text"
            className="searchField"
            value={this.state.searchTerm}
            onChange={this.handleSearch}
          />
          <button className="searchButton" type="submit" value="Submit">
            Search
          </button>
        </form>

        <form onSubmit={this.HandleSubmitQuote}>
          <div className="inputWrapper">
            <h2>Submit your own quote if you want!</h2>
            <label>Quote from: </label>
            <input
              type="text"
              className="inputFieldAuthor"
              name="newAuthor"
              placeholder="Who said it?"
              onChange={this.handleChangeAuthor}
            />
            <label>Your Quote: </label>
            <input
              type="text"
              className="inputFieldQuote"
              name="newQuote"
              placeholder="What did they say?"
              onChange={this.handleChangeQuote}
            ></input>
          </div>

          <button type="submit" value="Submit your quote">
            Submit Quote
          </button>
        </form>

        <h2 className="likes">
          Quotes liked: {this.state.likes} | Quotes disliked:{" "}
          {this.state.dislikes}
        </h2>
        {this.state.loading && "Loadin'..."}
        {this.state.emptySearch === false && (
          <h2>
            You just searched for "
            {
              this.state.previousSearches[
                this.state.previousSearches.length - 1
              ]
            }
            ", didn't you, you little scamp? Alright, here's some wisdom for ya.
          </h2>
        )}
        {this.state.emptySearch && (
          <h2>
            Ain't no quotes about{" "}
            <em>
              {
                this.state.previousSearches[
                  this.state.previousSearches.length - 1
                ]
              }
            </em>
            , dude. Why don't you try thinking up your own?
          </h2>
        )}

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
      </main>
    );
  }
}

export default QuoteSearcher;

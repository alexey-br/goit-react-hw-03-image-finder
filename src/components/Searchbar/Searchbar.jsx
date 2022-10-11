import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    text: '',
  };

  handleInput = e => this.setState({ text: e.currentTarget.value });

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;
    const { onSubmit } = this.props;

    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
            value={text}
          />
        </form>
      </header>
    );
  }
}

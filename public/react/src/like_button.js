'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const name = "Ben"
const element = <h1>Hello, {name}</h1>

document.addEventListener('DOMContentLoaded', async function() {
  const domContainer = document.querySelector('#like_button_container');
  ReactDOM.render(e(LikeButton), domContainer);
})

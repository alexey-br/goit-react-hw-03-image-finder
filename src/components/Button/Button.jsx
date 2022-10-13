const { LoadMoreBtn } = require('./Button.styled');

const Button = ({ onClick }) => {
  return <LoadMoreBtn onClick={() => onClick()}>Load more</LoadMoreBtn>;
};

export default Button;

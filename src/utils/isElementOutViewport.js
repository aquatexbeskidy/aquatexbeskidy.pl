const isElementOutViewport = (node) => {
  const { right, left } = node.getBoundingClientRect();

  const positionRight = parseInt(right);
  const positionLeft = parseInt(left);
  const innerWidth = window.innerWidth;

  return positionLeft < 0 || positionRight > innerWidth;
};

export default isElementOutViewport;

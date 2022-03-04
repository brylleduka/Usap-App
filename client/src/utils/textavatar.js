// Text avatar
// Get the first letter of words
// Max of 3 Characters
const textavatar = (name) => {
  return name
    .split(' ')
    .map((x) => x[0])
    .slice(0, 3)
    .join('');
};

export default textavatar;

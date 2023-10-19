const createRangeArray = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

module.exports = createRangeArray;

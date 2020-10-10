import axios from 'axios';
const KEY = '17911503-2ed926ce3a8ce366c6cd807d9';

const fetchArticlesWithQuery = (searcgQuery, page = 1) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searcgQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};
export default {
  fetchArticlesWithQuery,
};

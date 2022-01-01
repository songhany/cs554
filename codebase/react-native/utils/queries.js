import axios from 'axios';

const client = axios.create();
const host = `https://api.tvmaze.com`;

const grabTvShows = () => {
  return client.get(`${host}/shows`);
};

const grabShow = (id) => {
  return client.get(`${host}/shows/${id}`);
};

const doSearch = (text) => {
  return client.get(`${host}/search/shows?q=${text}`);
};

export {client, grabTvShows, grabShow, doSearch};

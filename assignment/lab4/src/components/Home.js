import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
      <div>
        <p>
          This is a Marvel API with React.
        </p>

        <p className="hometext">
          The application queries six of Marvel API end-points: &nbsp;
          <br />
          <br />
          <Link className="showlink" to="/characters/page/0">Characters</Link> for searching the characters in the API (You can search characters of Marvel in form)
          <br />
          <br />
          <Link className="showlink" to="/comics/page/0">Comics</Link> for searching the comics in the API (You can search comics of Marvel in form)
          <br />
          <br />
          <Link className="showlink" to="/series/page/0">Series</Link> for searching the series in the API (You can search series of Marvel in form)
        </p>
      </div>
  );
}

export default Home

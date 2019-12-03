import React from 'react';

const Hearthstone = ({ data }) => (
  <React.Fragment>
    {
      data.broadcaster && data.broadcaster.hero ? (
        <React.Fragment>
          <p><b>Player type:</b> {data.broadcaster.hero.type}</p>
          <p><b>Player class:</b> {data.broadcaster.hero.class}</p>
          <p><b>Player name:</b> {data.broadcaster.hero.name}</p>
        </React.Fragment>
      ) : (
        <p>Can not get player info</p>
      )
    }
    {
      data.opponent && data.opponent.hero ? (
        <React.Fragment>
          <p><b>Opponent type:</b> {data.opponent.hero.type}</p>
          <p><b>Opponent class:</b> {data.opponent.hero.class}</p>
          <p><b>Opponent name:</b> {data.opponent.hero.name}</p>
        </React.Fragment>
      ) : (
        <p>Can not get opponent info</p>
      )
    }
  </React.Fragment>
);

export default Hearthstone;

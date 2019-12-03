import React from 'react';

const Hearthstone = ({ data }) => (
  <React.Fragment>
    {
      data.broadcaster && data.broadcaster.hero ? (
        <React.Fragment>
          <p><b>Role:</b> {data.broadcaster.hero.role}</p>
          <p><b>Name:</b> {data.broadcaster.hero.name}</p>
          <p><b>Ability:</b> {data.broadcaster.hero.ability}</p>
        </React.Fragment>
      ) : (
        <p>Player has been killed</p>
      )
    }
  </React.Fragment>
);

export default Hearthstone;

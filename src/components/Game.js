import React from 'react';
import Hearthstone from './Hearthstone';
import Overwatch from './Overwatch';
import styles from '../styles/game.module.css';

const Games = ({ game }) => (
  <div className={styles.gameinfo}>
    <h2><a href={`https://www.twitch.tv/${game.user_name}`} target="_blank" rel="noopener noreferrer">{game.user_name}</a></h2>
    <p><b>Viewers:</b> {game.viewers}</p>

    {!game.hearthstone && !game.overwatch &&
      (<p>Can not get game data</p>)
    }

    {game.hearthstone && (
      <Hearthstone data={game.hearthstone} />
    )}

    {game.overwatch && (
      <Overwatch data={game.overwatch} />
    )}
  </div>
);

  export default Games;

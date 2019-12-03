import React from 'react';
import styles from '../styles/game.module.css';

const DropDown = ({ options, value, handleChange }) => (
  <select className={styles.dropdown}
    value={value}
    onChange={handleChange}
  >
    {options.map(option =>
      <option key={option} value={option}>{option}</option>
    )}
  </select>
);

export default DropDown;

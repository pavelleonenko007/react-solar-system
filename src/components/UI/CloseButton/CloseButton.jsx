import React from 'react';
import styles from './CloseButton.module.css';

export const CloseButton = (props) => {
  return (
    <button className={styles['close-btn']} {...props}>
      <svg width="25" height="26" viewBox="0 0 25 26" fill="none">
        <line
          x1="1"
          y1="24.2929"
          x2="24.2929"
          y2="1"
          stroke="white"
          strokeLinecap="round"
        />
        <line
          x1="24.2929"
          y1="25"
          x2="1"
          y2="1.70711"
          stroke="white"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

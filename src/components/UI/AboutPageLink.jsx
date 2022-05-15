import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPageLink(props) {
  return (
    <Link to={'/about-us'} {...props}>
      About us
    </Link>
  );
}

import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function HeaderLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: false });
  return (
    <Link
      to={to}
      className={match ? 'nav_item nav_item--active' : 'nav_item'}
      {...props}
    >
      {children}
    </Link>
  );
}

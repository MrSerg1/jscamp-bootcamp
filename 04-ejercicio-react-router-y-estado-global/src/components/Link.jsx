import { useRouter } from '../hooks/useRouter'
import { NavLink } from 'react-router'

export function Link({ href, children, ...restOfProps }) {
  return (
    <NavLink 
    className={({ isActive }) => isActive ? 'active-link' : ''}
    to={href}
    {...restOfProps}
    >
      {children}
    </NavLink>
  );
}
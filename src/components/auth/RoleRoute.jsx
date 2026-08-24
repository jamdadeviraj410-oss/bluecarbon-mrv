import { Outlet } from 'react-router-dom';

export default function RoleRoute({ children }) {
  return children ? children : <Outlet />;
}

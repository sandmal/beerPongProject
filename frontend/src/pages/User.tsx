import { Link, Outlet } from 'react-router-dom';

function User() {
  return (
    <div>
      <h1>This is the user dashboard</h1>
      <p>See your statistics, team information and more.</p>
      <Link to='profile'>Profile</Link>
      <Outlet />
    </div>
  );
}

export default User;

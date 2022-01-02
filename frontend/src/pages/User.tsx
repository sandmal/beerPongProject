import { Link, Outlet } from 'react-router-dom';

function User() {
  return (
    <div>
      <h1>This is the user dashboard</h1>
      <p>See your statistics, team information and more.</p>
      <p>Change dark/light mode</p>
      <p>Change password</p>
      <p>Change alias</p>
      <Link to='profile'>Profile</Link>
      <Outlet />
    </div>
  );
}

export default User;

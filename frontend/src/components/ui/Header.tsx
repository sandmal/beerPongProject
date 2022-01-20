import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';

function Header() {
  const { state, dispatch } = useContext(AuthContext);
  const [registered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsRegistered(state.isRegistered);
    setIsLoggedIn(state.isLoggedIn);
  }, [state.isLoggedIn, state.isRegistered]);
  const [isActive, setIsActive] = useState(true);
  return (
    <nav className='bg-gray-100'>
      <div className='max-w-6xl mx-auto px-4 '>
        <div className='flex justify-between'>
          <div className='flex space-x-4'>
            <div>
              <NavLink to='/home' className='flex items-center py-5 px-2 text-gray-700 hover:text-gray-900'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 mr-1 text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span className='font-bold'>Home</span>
              </NavLink>
            </div>
            <div className='hidden md:flex items-center space-x-1'>
              <NavLink to='/discover' className='py-5 px-3 text-gray-700 hover:text-gray-900'>
                Discover
              </NavLink>
              <NavLink to='/tournament' className='py-5 px-3 text-gray-700 hover:text-gray-900'>
                Tournament
              </NavLink>
              {registered && isLoggedIn && (
                <NavLink to='/create' className='py-5 px-3 text-gray-700 hover:text-gray-900'>
                  Create
                </NavLink>
              )}
            </div>
          </div>
          <div className='hidden md:flex items-center space-x-1'>
            {!isLoggedIn ? (
              <>
                <NavLink to='/login' className='py-5 px-3'>
                  Login
                </NavLink>
                <NavLink
                  to='/register'
                  className='py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300'>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to='/user' className='py-5 px-3'>
                  User
                </NavLink>
                <NavLink
                  to='/logout'
                  onClick={() => {
                    dispatch({ type: 'USER_LOGOUT' });
                  }}
                  className='py-2 px-3 '>
                  logout
                </NavLink>
              </>
            )}
          </div>

          <div className='md:hidden flex items-center'>
            <button className='mobile-menu-button' onClick={() => setIsActive(!isActive)}>
              <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            </button>
          </div>
        </div>
        <div className={isActive ? 'mobile-menu hidden md:hidden' : 'mobile-menu md:hidden'}>
          <NavLink to='/discover' className='block py-2 px-4 text-sm hover:bg-gray-200'>
            Discover
          </NavLink>
          <NavLink to='/tournament' className='block py-2 px-4 text-sm hover:bg-gray-200'>
            Tournament
          </NavLink>
          {registered && isLoggedIn && (
            <NavLink to='/create' className='block py-2 px-4 text-sm hover:bg-gray-200'>
              Create
            </NavLink>
          )}
          <hr />
          {!isLoggedIn ? (
            <>
              <NavLink to='/login' className='block py-2 px-4 text-sm hover:bg-gray-200'>
                Login
              </NavLink>
              <NavLink
                to='/register'
                className='block py-2 px-4 text-sm bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300'>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to='/user' className='block py-2 px-4 text-sm hover:bg-gray-200'>
                User
              </NavLink>
              <NavLink
                to='/logout'
                onClick={() => {
                  dispatch({ type: 'USER_LOGOUT' });
                }}
                className='block py-2 px-4 text-sm hover:bg-gray-200'>
                logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Header;

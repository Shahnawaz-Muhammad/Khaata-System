import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className='w-full flex justify-center bg-gray-200'>
      <div className="max-w-screen-2xl flex px-20 py-10 w-full items-center justify-between">
        <Link to="/" className='cursor-pointer'>
          <h1 className='text-xl'>Khaata</h1>
        </Link>
        <nav>
          {user && (
            <div className='flex gap-4'>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div className='flex gap-4'>
              <Link to="/login" className='cursor-pointer'>Login</Link>
              <Link to="/signup" className='cursor-pointer'>Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
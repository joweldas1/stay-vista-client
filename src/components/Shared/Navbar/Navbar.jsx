import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import HostModal from '../Modal/HostModal'
import useAxiosCommon from '../../../hooks/useAxios'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()

//for modal
  const [isModalOpen,setIsModalOpen] = useState(false)

  const closeModel=()=>{
    setIsModalOpen(false)
  }
// update user role
  const modalHandler =async () =>{
    closeModel()
    try {
      const currentUser = {
        email:user?.email,
        role:'guest',
        status:'Requested'
      }
      const {data} =  await axiosSecure.put(`/user`,currentUser)
      if(data.modifiedCount>0){
        toast.success("Become Host Request Done")
      }
      else{
        toast.success("Please , wait for admin approval")
      }
      
      console.log(data,'data');
    } catch (error) {
console.log(error,"error from navbar to save data in mongo db");
    }
    finally{
      closeModel()
    }
    console.log("make me host");
  }
  return (
    <div  className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/4ZXzmq5/logo.png'
                alt='logo'
                width='100'
                height='100'
              />
            </Link>
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Become A Host btn */}
                <div className='hidden md:block'>
                  {/* {!user && ( */}
                    <button
                      
                      onClick={()=>setIsModalOpen(true)}
                      className=' cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition'
                    > 
                      Host your home
                    </button>
                    
                  {/* )} */}
                  <HostModal closeModal={closeModel} isOpen={isModalOpen} modalHandler={modalHandler} />
                </div>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'>
                          <NavLink to='/dashboard'>Dashboard</NavLink>
                          <button 
                           onClick={logOut}
                           className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                           > Logout</button>
                          
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar

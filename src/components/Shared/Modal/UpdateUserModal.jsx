import PropTypes from 'prop-types'
import { Fragment, useState } from 'react'
import {
  Dialog,
  Listbox,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Input,
} from '@headlessui/react'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineDown } from 'react-icons/ai'
import { imageUpload } from '../../../Api/Utils'
const roles = ['guest', 'host', 'admin']

const UpdateUserModal = ({ setIsOpen, isOpen , user ,updateUserProfile }) => {
  const [selected, setSelected] = useState(user?.role)


  const handleUpdate = async(e)=>{
    e.preventDefault()
    const name = e.target.name.value
    const image = e.target.image.files[0]

  try {
    const photo = await imageUpload(image)
    const result = await updateUserProfile(name,photo)
    console.log(result);
    setIsOpen(false)
  } catch (error) {
    console.log(error)
  }
  }



  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full h-56 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all'>
       <Input type='email' defaultValue={user?.email} disabled className="text-center  bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'"/>


    <form action="" onSubmit={handleUpdate} className='text-left my-2 space-y-3'>
      <input type="text" name='name' className='  bg-green-100 border-2 border-green-300 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 p-2' placeholder='enter your name'/>
      <input type="file" name='image' id='image'/>

      <div className='flex mt-2 justify-center gap-5'>
  <button

    className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
  >

    Update
  </button>
  <button
    type='button'
    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
    onClick={() => setIsOpen(false)}
  >
    Cancel
  </button>
</div>
    </form>


  

             
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

UpdateUserModal.propTypes = {
  user: PropTypes.object,
  modalHandler: PropTypes.func,
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  updateUserProfile:PropTypes.func
}

export default UpdateUserModal
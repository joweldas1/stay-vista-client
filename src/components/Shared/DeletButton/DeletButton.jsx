import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState } from 'react';
import "./button.css"

const DeletButton = ({id,handleDelete,isOpen,setIsOpen}) => {

    return (

    //     <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
    //     <span
    //       aria-hidden='true'
    //       className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
    //     ></span>
        
    //     <span className='relative'>Delete</span>
    //   </span>
        <>
      <button
      className='cursor-pointer inline-block px-3 py-1 font-semibold text-black leading-tight inset-0 bg-red-400 rounded-full  opacity-100  '
      onClick={() => setIsOpen(true)}>Delete</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-red-400 text-black   p-12">
            <DialogTitle className="font-bold">Are you sure to Delete?</DialogTitle>
            <p className='text-white'>After Deleted not possible to undone again.</p>
            <div className="flex gap-4">
              <button className='button button-cancel' onClick={() => setIsOpen(false)}>Cancel</button>
              <button className='button button-delete' onClick={()=>handleDelete(id)}>Delete</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
    );
};

export default DeletButton;
import { Helmet } from 'react-helmet-async'
import useAxiosCommon from '../../../hooks/useAxios'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import RoomDataRow from '../../RoomDetails/RoomDataRow';
import {toast} from "react-hot-toast"
import { useState } from 'react';


const MyListings = () => {
  const {user} = useAuth()
  const axiosSecure =useAxiosSecure()
  let [isOpen, setIsOpen] = useState(false)


  // fetch data---->
  const { data: rooms, isLoading, isError, error,refetch } = useQuery({
    queryKey:['rooms',user?.email],
    queryFn:async()=>{
      const {data} = await axiosSecure.get(`/my-listing/${user?.email}`)
      return data
    }
  });
  // delete api

  const {mutateAsync}=useMutation({
    mutationFn:async(id)=>{
      const {data} = await axiosSecure.delete(`/room/${id}`) 
      return data
    },
    onSuccess:(data)=>{
      toast.success("Delete Done")
      setIsOpen(false)
      refetch()
    }
  })


  // Delete function
  const handleDelete=(id)=>{
    mutateAsync(id)

  }


  if (isLoading) return <LoadingSpinner/>
  if (isError) return <div>Error: {error.message}</div>;






  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      To
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    rooms?.map((d,idx)=>(
                      <RoomDataRow
                      key={idx}
                       room={d}
                        refetch={refetch}
                        handleDelete={handleDelete}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyListings
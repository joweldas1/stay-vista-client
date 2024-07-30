import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const {user,loading} = useAuth()


    const {data:role,isLoading} = useQuery({
         queryKey:['role',user?.email],
         enabled:!loading && !!user?.email,
         queryFn : async()=>{
         const {data} = await axiosSecure(`/user/${user?.email}`)
         const role = data.role
         console.log(role,'user role--------------------------->');
         return role
    }
})
 
    return [role,isLoading]
}

export default useRole;
import useAxiosCommon from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useRooms = () => {
    const axiosCommon =useAxiosCommon()
    const {data} = useQuery({
        queryKey:["room"],
        queryFn: async()=>{
            const {result}= await axiosCommon.get('/rooms')
            return result
        }
    })
    return data
};

export default useRooms;
import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Api/Utils";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
    const [dates,setDates] = useState( 
        {
              startDate: new Date(),
              endDate: new Date(),
              key: 'selection'
        }
     )
     const [imagePreview,setImagePreview] = useState()
     const [imageText,setImageText] = useState("Upload Image")
     const {user} = useAuth()
     const axiosSecure = useAxiosSecure()
     const [loading,setLoading] = useState(false)
     const navigate = useNavigate()

     const {mutateAsync} = useMutation({
        mutationFn:async roomData =>{
        const {data} = await axiosSecure.post('/room',roomData)
        return data
        },

        onSuccess:()=>{
            setLoading(false)
            toast.success('Data posted done')
            return navigate('/dashboard/my-listings')
        }
     })

     const handleDates = item =>{
        setDates(item.selection)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        const form = e?.target;
        const location = form.location ? form.location.value : null;
        const category = form.category ? form.category.value : null;
        const title = form.title ? form.title.value : null;
        const to = dates.endDate;
        const from = dates.startDate;
        const price = form.price ? form.price.value : null;
        const bathrooms = form.bathrooms ? form.bathrooms.value : null;
        const description = form.description ? form.description.value : null;
        const bedrooms = form.bedrooms ? form.bedrooms.value : null;
        const image =  form.image.files[0]
        const totalGuest = form.total_guest ? form.total_guest.value : null

        const host = {
            name : user?.displayName,
            image:user?.photoURL,
            email: user?.email,
        }

    try {
        
        const imageUrl= await imageUpload(image)
        
        const roomData = {
            location,category,title,to,from,price,totalGuest,bathrooms,description,bedrooms,image:imageUrl,host
        }
        mutateAsync(roomData)
      
    } catch (error) {
        setLoading(false)
        return toast.error(error.message)
    }
    }

    const handleImage=image=>{

        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
        console.log(image.name);

    }


    return (
        <div>
            <Helmet> <title>Add Room </title> </Helmet>
            <h1>add your room</h1>
            <AddRoomForm
            dates={dates}
            handleDates={handleDates}
            handleSubmit={handleSubmit}
            setImagePreview={setImagePreview}
            imagePreview={imagePreview}
            handleImage={handleImage}
            imageText={imageText}
            loading={loading}
            />
        </div>
    );
};

export default AddRoom;
import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../Api/Utils";

const AddRoom = () => {
    const [dates,setDates] = useState( 
        {
              startDate: new Date(),
              endDate: null,
              key: 'selection'
        }
     )
     const {user} = useAuth()

     const handleDates = item =>{
        setDates(item.selection)
    }
    console.log(dates);

    const handleSubmit = async e =>{
        e.preventDefault()
        const form = e.target;

        const location = form.location.value;
        const category = form.category.value;
        const title = form.title.value;
        const to = dates.endDate; 
        const from = dates.startDate;
        const price = form.price.value;
        const guests = form.guests.value;
        const bathrooms = form.bathrooms.value;
        const description = form.description.value;
        const bedrooms = form.bedrooms.value;
        const image = from.image.files[0]

        const host = {
            name : user?.displayName,
            image:user?.photoURL,
            email: user?.email,
        }

        const imageUrl= await imageUpload(image)
        console.log(imageUrl);

        const roomData = {
            location,category,title,to,from,price,guests,bathrooms,description,bedrooms,image:imageUrl,host
        }


    }


    return (
        <div>
            <h1>add your room</h1>
            <AddRoomForm
            dates={dates}
            handleDates={handleDates}
            handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default AddRoom;
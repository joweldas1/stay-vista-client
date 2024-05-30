import axios from "axios"

export const imageUpload = async image =>{
    try {
        const formData = new FormData()
        formData.append('image',image)
        const {data} =  await axios.post(
            `https://api.imgbb.com/1/upload?key=cb87e3adcfe5c91da28a862877b6bce6`,formData
        )
        const imageUrl=data?.data?.display_url 
        console.log(imageUrl,'index 11');
        return imageUrl
        
    } catch (error) {
        console.log(error,'index imgbb error');
    }
}
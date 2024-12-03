import axios from "axios";
import { useEffect, useState } from "react";

const Profile =()=>{
    const[profile, setProfile] = useState([]);
    const baseUR="http://localhost/5000/getInfor"
    const userID = sessionStorage.getItem("userID");
    const token = sessionStorage.getItem("token");
    console.log("profile", userID);
    

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response = await axios.get(`${baseUR}/${userID}`,{
                    headers:{
                        Authorization:`Bearer ${JSON.parse(token)}`
                    }
                })
                console.log("profile",response.data);
                
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchData();
    })

}
export default Profile;
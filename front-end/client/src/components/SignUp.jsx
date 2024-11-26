import React, { useRef } from "react";
import "./CSS/Signup.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Signup = ({ onRotate }) => {
    //const { username, password, email, phone, address, notification } = req.body;
    // this is data

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);
    const notificationRef = useRef(null);

    // notification

    const showAddSuccessfully = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Added successfully",
            showConfirmButton: false,
            timer: 1000
        });
    }
    const showAddFail = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Username is already taken",
        });
    }

    //this is used for navigation
    const navigate = useNavigate();

    //handle submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const address = addressRef.current.value;
        const notification = notificationRef.current.checked;
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Address:", address);
        console.log("Notification Enabled:", notification);
        const data = {
            username: username,
            password: password,
            email: email,
            phone: phone,
            address: address,
            notification: notification,
        };

        try {
            const response = await axios.post('http://localhost:5000/signup', data, {
                headers: {
                    "Content-Type": "application/json", 
                },
            });
            localStorage.setItem("localUser", JSON.stringify(response.data.session.localUser));
            console.log(response.data.session.localUser);
            showAddSuccessfully();
            navigate("/MainPage");
        } catch (error) {
            showAddFail();
            console.error("Error:", error);
        }
    }
    return (
        <>
            

            <div className="box" style={{cursor:"pointer"}}>
                <i style={{ color: "white", fontSize: "20px" }} onClick={onRotate} class="fa-solid fa-arrow-left"></i>
                <h2 style={{ color: "white", fontSize: "40px", marginBottom: "20px" }}>Sign up</h2>
                <form action="" method="GET" className="d-flex align-items-center flex-column" onSubmit={handleSubmit}>
                    <p style={{ color: "white", fontSize: "15px" }}>User name</p>
                    <input type="text" className="textbox" placeholder="type user name" name="username" required
                        ref={usernameRef} />
                    <p style={{ color: "white", fontSize: "15px" }}>Password</p>
                    <input type="password" className="textbox" placeholder="type user password" name="password" required
                        ref={passwordRef} />
                    <p style={{ color: "white", fontSize: "15px" }}>Email</p>
                    <input type="email" className="textbox" placeholder="type your email" name="email" required
                        ref={emailRef} />
                    <p style={{ color: "white", fontSize: "15px" }}>Phone</p>
                    <input type="tel" className="textbox" placeholder="type your phone" name="phone" required
                        ref={phoneRef} />
                    <p style={{ color: "white", fontSize: "15px" }}>Address</p>
                    <input type="text" className="textbox" placeholder="type your address" name="address" required
                        ref={addressRef} />
                    <input className="form-check-input" type="checkbox" value="" name="notification"
                        ref={notificationRef} />
                    <label className="form-check-label" style={{ color: "white", fontSize: "15px" }}>
                        Enable Notifications
                    </label>
                    <button type="submit" className="submit" style={{ marginTop: "20px" }}>Sign up</button>
                </form>
                <p style={{ color: "white", fontSize: "20px" }}>Sign up with</p>
                <div className="d-flex align-items-center justify-content-around signUpButtonGroup">
                    <div className="signUpButton" ><i className="bi bi-google"></i></div>
                    <div className="signUpButton" ><i className="bi bi-facebook"></i></div>
                </div>
            </div>
        </>);
}
export default Signup;
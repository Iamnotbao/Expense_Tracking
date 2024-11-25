import React, { useState } from "react";
import "./CSS/Login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const navigation = useNavigate();
    const baseURL = "http://localhost:5000/signin"
    console.log("check data", data);

    const handleInput = (event) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        if (name && value) {
            setData(prev => ({
                ...prev,
                [name]: value,
            }))
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            baseURL,
            data,
            headers: {
                "Content-Type": "application/json"
            }
        }
        let response;
        try {
            response = await axios(options);
            console.log(response.data);
            if (response.data) {
                console.log("Your data: ", response.data);
                localStorage.setItem("user",response.data.username);
                localStorage.setItem("token",response.data.token);
                navigation("/expense_tracking/home");

            }

        } catch (error) {
            console.log("cannot fetch the data", error);

        }
    }


    return (
        <>
            <div className="box">
                <h2 style={{ color: "white", fontSize: "40px", marginBottom: "20px" }}>Login</h2>
                <form action="" method="GET" className="d-flex align-items-center flex-column" onSubmit={handleSubmit}>
                    <input type="text" className="textbox" placeholder="type your email..." name="username" required onChange={handleInput} />
                    <input type="password" className="textbox" placeholder="type your password..." name="password" required onChange={handleInput} />
                    <button type="submit" className="submit" style={{ marginTop: "20px" }}>Sign In</button>
                </form>
                <p style={{ color: "white", fontSize: "20px" }}>Sign in with</p>
                <div className="d-flex align-items-center justify-content-around signInButtonGroup">
                    <div className="signInButton" ><i className="bi bi-google"></i></div>
                    <div className="signInButton" ><i className="bi bi-facebook"></i></div>
                </div>
            </div>

        </>)
}
export default Login;
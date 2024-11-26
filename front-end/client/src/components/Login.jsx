import React, { useState, useRef } from "react";
import "./CSS/Login.css"
import axios from "axios"
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
const Login = () => {
    const navigate = useNavigate();

    // const showLoginFail = () => {
    //     Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "wrong user or password",
    //       });
    // };


    // const showLoginSuccess= ()=>{
    //     Swal.fire({
    //         position: "center",
    //         icon: "success",
    //         title: "Login Successfully",
    //         showConfirmButton: false,
    //         timer: 1000
    //       });
    // }


    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const baseURL = "http://localhost:5000/signin"


    const handleSubmit = async (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const data = {
            username,
            password
        };
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
                console.log("Your data: ", response);
                const user = response.data.session.localUser;
                localStorage.setItem("localUser",JSON.stringify(user));
                console.log(user);
               
                showLoginSuccess();
                navigate("expense_tracking/home");
            }


        } catch (error) {
            showLoginFail()
            console.log("cannot fetch the data", error);
        }
    }


    // handleRotate
    const [showSignup, setShowSignup] = useState(false);
    const boxRef = useRef(null);
    const handleRotate = () => {
        if (boxRef.current) {
            let rotation = 90; // Set a fixed rotation angle for the first step
            boxRef.current.style.transition = 'transform 0.5s ease-out';
            boxRef.current.style.transform = `rotateY(${rotation}deg)`;
            // After the rotation finishes, reset the rotation and show signup
            setTimeout(() => {
                boxRef.current.style.transform = 'rotateY(0deg)';
                setShowSignup(!showSignup);  // Toggle between login and signup
            }, 500); // Reset after 0.5s (same as transition time)
        }


    };

    //this is login
    const LoginContent = () => {
        return (

            <div>
                <h2 style={{ color: "white", fontSize: "40px", marginBottom: "20px" }}>Login</h2>
                <form  method="POST" className="d-flex align-items-center flex-column" onSubmit={handleSubmit}>
                    <input type="text" className="textbox" placeholder="type your username" name="username"
                        ref={usernameRef}
                    />
                    <input type="password" className="textbox" placeholder="type your password..." name="password"
                        ref={passwordRef}
                    />
                    <button type="submit" className="submit" style={{ marginTop: "20px" }}>Sign In</button>
                </form>
                <p style={{ color: "white", fontSize: "20px" }}>Sign in with</p>
                <div className="d-flex align-items-center justify-content-around signInButtonGroup">
                    <div className="signInButton" ><i className="bi bi-google"></i></div>
                    <div className="signInButton" ><i className="bi bi-facebook"></i></div>
                </div>
                <div className="d-flex align-items-center justify-content-around signInButtonGroup">
                    <p style={{ color: "white", fontSize: "15px" }}>Don't have an account? <a onClick={() => { handleRotate() }} style={{ color: "#FFFF00" }} >Sign up</a></p>
                </div>
            </div>
        );
    }


    // choose login or signup
    const HandleLoginOrSignup = () => {
        if (showSignup) {
            return (
                  <Signup onRotate={handleRotate}/>
            );
        } else {
            return (
                <LoginContent />
            );
        }
    };

    return (

        <div className="box" ref={boxRef} style={{
            transform: `rotateY(0deg)`,
            transition: 'transform 0.5s ease-out',
        }}>
            <HandleLoginOrSignup />
        </div>
    );
}
export default Login;
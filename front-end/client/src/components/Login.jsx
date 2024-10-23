import React from "react";
import "./Login.css"

const Login = () => {
    return (
        <>
            <div className="box">
                <h2 style={{ color: "white", fontSize: "40px", marginBottom:"20px" }}>Login</h2>
                <form action="" method="POST" className="d-flex align-items-center flex-column">
                    <input type="text" className="textbox" placeholder="Email" name="username" />
                    <input type="password" className="textbox" placeholder="Password" name="password" />
                    <button type="submit" className="submit">Sign In</button>
                    <p style={{ color: "red", fontSize: "20px" }}>Or Login With</p>
                </form>
                <div className="d-flex align-items-center justify-content-around">
                    <div style={{width:"50px", padding:"10px", backgroundColor:"grey"}}><i className="bi bi-google"></i></div>
                    <div style={{width:"50px", padding:"10px", backgroundColor:"grey"}} className="logo" ><i className="bi bi-facebook"></i></div>
                </div>
            </div>

        </>)
}
export default Login;
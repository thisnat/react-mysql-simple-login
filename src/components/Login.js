import { useState } from 'react'
import Axios from 'axios'

const Login = ({setSession}) => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errMsg,setErrMsg] = useState('')

    const handleUsername = (e) =>{
        setUsername(e.target.value)
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value)
    }

    const login = (e) =>{
        e.preventDefault()
        Axios.post('http://localhost:3001/login',{username:username,password:password}).then((res) =>{
            const user = res.data[0]
            localStorage.setItem("user", JSON.stringify(user));
            setSession({
                isLoggedIn: true,
                currentUser: user
            });
        }).catch((err)=>{
            setSession({
                isLoggedIn: false,
                currentUser: null,
            });
            if(err.response.status === 401){
                setErrMsg('incorrect username or password')
            }
            else{
                setErrMsg(err.message)
            }
        })
    }

    const errDiv = errMsg
        ? <div className="alert alert-danger mt-3" role="alert">
            {errMsg}
            </div>
        : ''; 

    return (
        <div className="container" style={{maxWidth:"500px",marginTop:"10%"}}>
        <h1>react super simple login</h1>
        <form action="">
            <div className="form-group mt-3">
            <label htmlFor="inputU" className="form-label">Username</label>
            <input type="text" className="form-control" id="inputU" onChange={handleUsername}/>
            </div>
            <div className="form-group mt-3">
            <label htmlFor="inputP" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputP" onChange={handlePassword}/>
            </div>
            <button className="btn btn-primary mt-3" onClick={login}>login</button>
            {errDiv}
        </form>
        </div>
    );
}

export default Login;

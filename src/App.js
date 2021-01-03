import { useState, useEffect } from 'react'
import Login from './components/Login'

function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
  });

  const handleLogout = () =>{
    localStorage.removeItem("user");
    setSession({
      isLoggedIn: false,
      currentUser: null
    });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        setSession({
          isLoggedIn: true,
          currentUser: user
        });
      }
  }, [])

  return(
    <div className="App">
      {session.isLoggedIn ? (
        <div className="container">
          <h1>หวัดดีไอ่ควาย, {session.currentUser.username}</h1>
          <p className="lead">id : {session.currentUser.id}</p>
          <p className="lead">password : {session.currentUser.password}</p>
          <p className="lead">id มึงสร้างเมื่อ : {session.currentUser.create_at}</p>
          <button className="btn btn-danger" onClick={handleLogout}>logout</button>
        </div>
      ) : (
        <Login setSession={setSession} />
      )}
    </div>
  )
}

export default App;

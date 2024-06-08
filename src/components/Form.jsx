import {useState} from "react";

const Form = ({setIsLogged}) => {
    const [user1, setUser1] = useState('');
    const [user2, setUser2] = useState('');
    async function loginUser(e){
        e.preventDefault();

        const data = {
            user1: user1,
            user2: user2
        }

        const response = await fetch(' http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.status === 200) {
            setIsLogged(true)
        }
        else
            alert("Error! Either user 1 or 2 incorrect")
    }

  return <form onSubmit={loginUser}>
      <input type="text" name="user1" placeholder="Enter Player One" value={user1}
      onChange={(event)=>setUser1(event.target.value)}/>
      <br/>
      <input type="text" name="user2" placeholder="Enter Player Two" value={user2}
             onChange={(event)=>setUser2(event.target.value)}/>
      <br/>
      <button type="submit" className="btn">START GAME</button>
  </form>
}

export default Form;
import HeaderPage from "./HeaderPage.jsx";
import FooterPage from "./FooterPage.jsx";
import {useEffect, useState} from "react";

const ScoreBoard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const response = await fetch('http://127.0.0.1:8000/sore-board', {method: 'GET'})
                .then((res) => res.json()
                    .then((data) => setUsers(data))
                )
            /*console.log(users)*/
        }

        getUsers()
    }, []);


    return (
        <>
            <HeaderPage/>
            <div className={'score-board'}>
                <h3>SCORE TABLE(TOP 10)</h3>
                <table className={'score-table'}>
                    <thead>
                    <tr>
                        <th>ROW</th>
                        <th>NAME</th>
                        <th>SCORE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.slice(0, 10).map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.total_score}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <FooterPage/>
        </>
    );
};


export default ScoreBoard;
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Config from '../../config.json';

import "react-quill/dist/quill.snow.css";
import './admin.css';

function BlogList (props) {
  const [checked, setChecked] = React.useState(true);
    const [userData, setUserData] = useState();

    useEffect(() => {
        fetch(`${Config.serverapi}/getBlogAndComment`, {
        method: 'post',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        // body: JSON.stringify({ flag: checked })
        })
        .then(res =>
            res.json()
        )
        .then(data => {
            console.log('flag*********: ',data)
            setUserData(data);
        })
        .catch(err => console.log(err))

    },[]);
    
    const confirm = ()=>{
        const username = document.getElementById("username").value;
        console.log("userDataName*********:", username)
        fetch(`${API_URL}/reply`, {
            method: 'post',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name: username, flag: false })
        })
        // .then(res =>
        //     res.json()
        // )
        .then(data => {
            
            console.log('flag*********: ',data)
        })
        .catch(err => console.log(err))
    }

    let list =  Array.isArray(userData) ? 
        userData.map((user, key) => {
            return(
                <tr>
                    <td> {key} </td>
                    <td> {user.username}</td>
                    <td> {user.usercontent}</td>
                    <td>    
                        {/* <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/> */}
                        <button className="btn btn-primary" onClick={confirm} value={user.username} id="username"> Confirm </button>
                    </td>
                </tr>
            );
    }) : null;

    return (
        <div style={{display:'block', inlineSize: 'min-content'}}>
            <table id="customers">
                <tr>
                    <th> No </th>
                    <th> UserName </th>
                    <th> Description </th>
                    <th> Performance </th>

                </tr>
                { list }
            </table>
         
        </div>
    );
}


export default BlogList;

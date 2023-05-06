import React, { useState, useEffect } from "react";
import "../static/css/App.css"
import FriendList from "../components/FriendList";
import { Link, redirect } from "react-router-dom";

import Button from '@mui/material/Button';

function FriendPage(props) {
    const[friendsData, setFriendsData] = useState([]);

    // get friend data
    const fetchFriendsData = async () => {
        fetch("/GetFriends", {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
            .then((response) => response.json())
            .then((data) => {
            setFriendsData(data);
        });
    };

    // post search query

    useEffect(() => {
        fetchFriendsData();
    }, []);

    return (
        <div>
            
            {/* Friends list */}
            <h1>Your Friends</h1>
            <Button variant="contained" component={Link} to='/searchUser'>+ New Friends</Button>
            <FriendList datalist={friendsData} />
        </div>
    )
}

export default FriendPage;

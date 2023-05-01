import React, { useState, useEffect } from "react";
import "../static/css/App.css"
import FriendList from "../components/FriendList";

function FriendPage(props) {
    const[friendsData, setFriendsData] = useState([]);
    const fetchFriendsData = async () => {
        fetch("/GetFriends", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
            setFriendsData(data);
        });
    };

    useEffect(() => {
        fetchFriendsData();
    }, []);

    return (
        <div>
            <h1>Your Friends</h1>
            <FriendList datalist={friendsData} />
        </div>
    )
}

export default FriendPage;

import React, { useState } from "react";
import { TextField, IconButton, List, ListItem, ListItemText, Button, Snackbar, Alert } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import FriendList from "../components/FriendList";

import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckIcon from '@mui/icons-material/Check';


function SearchUserPage(props) {
    const [searchQuery, setSearchQuery] = useState({username: ""});
    const [searchResult, setSearchResult] = useState({'non-friends': []});
    const [showmsg, setShowmsg] = useState(false);
    const [iconState, seticonState] = useState(new Set());
    // Handle click on search
    const handleSubmit = (event) => {
        fetch("/SearchUser", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + props.token,
            },
            body: JSON.stringify(searchQuery),
        })
          .then((response) => response.json())
          .then((data) => {
            setSearchResult(data);
          });
    }

    // Handle request to api
    const handleRequest = (username) => {
        fetch("/FriendRequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + props.token,
            },
            body: JSON.stringify({'target': username}),
        })
            .then((response) => response.json())
            .then((data) => {
                setShowmsg(true);
            })
        ;
    }

    // User card list
    const UserList = ({ datalist }) => {
        return (
            <List>
                {Array.from(datalist).map((data) => {
                    return (
                    <ListItem key={data.username}>
                        <ListItemText primary={`${data.fname} ${data.lname}`} secondary={data.username} />
                        { iconState.has(data.username) ?
                        <Button disabled>
                        <CheckIcon color='success' />
                        </Button>
                        :
                        <Button id={data.username}
                        onClick={(event) => {
                        seticonState(iconState.add(data.username));
                        handleRequest(data.username);
                        }}>
                            <GroupAddIcon color="primary"/>
                        </Button>
                        }
                    </ListItem>
                    )
                })}
            </List>
        )
    }

    const handleSnackClose = () => {
        setShowmsg(false);
    }

    return (
        <div>
            {/* Friend Searchbar */}
            <form>
                <TextField
                id = "search-bar"
                className="text"
                name="username"
                onInput={(e) => {
                    setSearchQuery({...searchQuery, [e.target.name]: e.target.value});
                }}
                label="Search for User"
                variant="outlined"
                placeholder="Username..."
                size="small"
                />
                <IconButton onClick={handleSubmit} aria-label="search">
                    <SearchIcon style={{ fill: "blue"}} />
                </IconButton>
            </form>
            
            <UserList datalist={searchResult['non-friends']} />
            <Snackbar open={showmsg} autoHideDuration={1500} onClose={handleSnackClose}>
              <Alert severity="success" variant='filled' sx={{ width: '100%' }}>
                Friend request sent!
              </Alert>
            </Snackbar>
        </div>
    )
}

export default SearchUserPage;
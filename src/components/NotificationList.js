import React, { useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, Button, ListItemText, Snackbar, Alert } from '@mui/material';

function NotificationList({ datalist, token }) {
    const [showmsg, setShowmsg] = useState(false);
    const [completed, setCompleted] = useState(new Set());

    const handleClick = (event) => {
        const request_data = {'target': event.target.name, 'action': event.target.id};
        setCompleted(completed)
        fetch("/HandleRequest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(request_data),
        })
            .then((response) => response.json())
            .then((data) => {
                setShowmsg(true);
                setCompleted(completed.add(event.target.name));
            });
    }


    const handleSnackClose = () => {
        setShowmsg(false);
    }

    return (
        <div>
        <List>
            {datalist.map((data) => {
        return (
            <ListItem key={data.username}>
                <ListItemText
                primary={`${data.fname} ${data.lname} wants to make friends.`}
                secondary={`${data.username}`} 
                />
                {completed.has(data.username) ? 
                <Button disabled >Processed</Button>
                : 
                <div>
                <Button color='success' variant='outlined' startIcon={<CheckIcon/>} edge='end' sx={{m: 1}}
                id="accept" name={data.username} onClick={handleClick.bind(this)}>
                  Accept
                </Button>
                <Button color='error' variant='outlined' startIcon={<CloseIcon/>} edge='end' sx={{m: 1}}
                id="decline" name={data.username} onClick={handleClick.bind(this)}>
                  Decline
                </Button>
                </div>
                }
                
            </ListItem>
        );
    })}
        </List>
        <Snackbar open={showmsg} autoHideDuration={1500} onClose={handleSnackClose}>
        <Alert severity="success" variant='filled' sx={{ width: '100%' }}>
          Friend request sent!
        </Alert>
      </Snackbar>
      </div>
    );
}

export default NotificationList;
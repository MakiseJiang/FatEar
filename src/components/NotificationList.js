import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, Button, ListItemText } from '@mui/material';

function NotificationList({ datalist }) {
    const notices = datalist.map((data) => {
        return (
            <ListItem key={data.username}>
                <ListItemText
                primary={`${data.fname} ${data.lname} wants to make friends.`}
                secondary={`${data.username}`} 
                />
                <Button color='success' variant='outlined' startIcon={<CheckIcon/>} edge='end' sx={{m: 1}}>
                  Accept
                </Button>
                <Button color='error' variant='outlined' startIcon={<CloseIcon/>} edge='end' sx={{m: 1}}>
                  Decline
                </Button>
            </ListItem>
        );
    });

    return (
        <List>
            {notices}
        </List>
    );
}

export default NotificationList;
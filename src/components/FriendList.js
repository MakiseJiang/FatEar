import { List, ListItem, ListItemText} from "@mui/material"


function FriendList({ datalist }) {
    const friendItemList = Array.from(datalist).map((data) => {
        return (
            <ListItem key={data.username}>
              <ListItemText primary={`${data.fname} ${data.lname}`} secondary={data.username} />
            </ListItem>
        );
    });

    return (
        <List>
            {friendItemList}
        </List>
    );
    
}

export default FriendList;
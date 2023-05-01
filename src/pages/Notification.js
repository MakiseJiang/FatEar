import { React, useState, useEffect } from "react";
import "../static/css/App.css"
import NotificationList from "../components/NotificationList";

function NotificationPage() {
    const [notifies, setNotifies] = useState([]);

    const fetchNotifies = async () => {
        fetch('/GetNotifications', {
          method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
              setNotifies(data);
            });
      }
    
      useEffect(() => {
        fetchNotifies();
      }, []);
      
    return (
        <div>
            <h1>New Notifications</h1>
            <NotificationList datalist={notifies} />
        </div>
    )
}

export default NotificationPage;

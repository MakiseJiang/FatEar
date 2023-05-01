import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../static/css/App.css';

import { Stack, Button, TextField, Snackbar, Alert } from '@mui/material';

function ViewPage(props) {
    const { sid } = useParams();
    const [viewData, setData] = useState({});
    const [reviews, setReviews] = useState([]); 
    const [userPost, setPost] = useState({
        songID: sid,
        rate: 0,
        reviewContent: "",
    });

    const fetchData = () => {
        fetch("/GetItem", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({item_id: sid, item_type: 'song'}),
        })
            .then((response) => response.json())
            .then((data) => {
            setData(data);
            setReviews(data.reviews);
        });
    };
    
    // Handle user submit rating and review
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/Submit-review-rating", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userPost),
          })
            .then((response) => response.json())
            .then((data) => {
                handleStatusCheck(data);
            });
        setPost({
            songID: sid,
            rate: 0,
            reviewContent: "",
        });
    };

    const handleChange = (event) => {
        setPost({ ...userPost, [event.target.name]: event.target.value });
      };

    // Check return data and decide show message
    const [opensuc, setOpensuc] = useState(false);
    const [openfai, setOpenfai] = useState(false);
    const handleStatusCheck = (data) => {
        if (data.success) {
            setOpensuc(true);
        } else {
            setOpenfai(true);
        }
    }

    const handleSnackClose = () => {
        setOpensuc(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Review List
    const reviewList = reviews.map((review) => {
        return (
            <div key={review.username}>
                <p>{review.reviewDate}</p>
                <p>{review.fname} {review.lname} said: {review.reviewText}</p>
            </div>
        );
    });


    return (
        <div>
            <h1>{viewData.title}</h1>
            <p>By {viewData.fname} {viewData.lname}</p>
            <p>{viewData.songURL}</p>
            <p>Release Date: {viewData.releaseDate}</p>


            {/* Comment and rating form */}
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} direction="column">
                  <TextField
                    id="outlined-multiline-static"
                    variant='outlined'
                    label="Comment"
                    multiline
                    rows={4}
                    fullWidth
                    name='reviewContent'
                    value={userPost.reviewContent}
                    onChange={handleChange}
                  />

                <Button type="submit" variant="contained">Post Comment</Button>
                </Stack>
            </form>
            <Snackbar open={opensuc} autoHideDuration={1500} onClose={handleSnackClose}>
              <Alert severity="success" variant='filled' sx={{ width: '100%' }}>
                Submit success!
              </Alert>
            </Snackbar>
            <Snackbar open={openfai} autoHideDuration={1500}>
              <Alert  severity="error" sx={{ width: '100%' }}>
                Oops! Something went wrong.
              </Alert>
            </Snackbar>

            {reviewList}
        </div>
    );
}

export default ViewPage;
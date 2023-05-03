import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState({songname: ""});
    const [searchResult, setSearchResult] = useState([]);

    // Handle click on search
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/Search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(searchQuery),
        })
          .then((response) => response.json())
          .then((data) => {
            setSearchResult(data);
          });
    }



    return (
    <div>
    <form onSubmit={handleSubmit}>
        <TextField
          id = "search-bar"
          className="text"
          name="songname"
          onInput={(e) => {
            setSearchQuery({...searchQuery, [e.target.name]: e.target.value});
          }}
          label="Search for songs"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue"}} />
        </IconButton>
    </form>

    {searchResult.map((record) => {
        return (
            <div key={record.songID}>
            <p >{record.title} </p>
            <p>{record.songURL}</p>
            <Link to={`/song/${record.songID}`}>View</Link>
            </div>
        )
    })}
    

    </div>
    );
}

export default SearchBar;
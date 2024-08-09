import React from 'react';
import '../../App.css';
import '../playlist.css';
import axios from 'axios';
import {
    useRef,
    useState,
    useEffect
} from "react";
// import xtype from 'xtypejs';

const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50';
// let playlistId = ''; //'&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk';
const apiUrlEnd = '&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk';

const array = [];
let count = 0;

function Format() { 
    
    const [vidCount, setCount] = useState(0);
    const [totalvids, setTotalVids] = useState(0);
    const [newUrl, setNewUrl] = useState('');
    const inputRef = useRef('');
    const searchVal = useRef('');
    const [playlistId, setPlaylistId] = useState(inputRef.current.value);
    const [nextPage, setNextPage] = useState('');
    // const [prevPage, setPrevPage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        setPlaylistId(inputRef.current.value.length === 0 ? '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk' : '&playlistId=' + inputRef.current.value);
    }

    useEffect(() => {
        (nextPage !== 'NoNewUrl') ? setNewUrl(apiUrl + nextPage + playlistId + apiUrlEnd) : setNewUrl('DeadEnd');
    }, [playlistId, nextPage]);

    const getVideosPage = (nn) => {
        let response = null;
        if (nn === 'DeadEnd') {
            return
        };
        fetch(nn).then(res => {
            return (!res.ok) ? alert('No valid Url') : response = res.json();

        }).then(data => {
            if (typeof data === "undefined") {
                return;
            }
            console.log(data);
            setTotalVids(data.pageInfo.totalResults);
            setNextPage(typeof data.nextPageToken !== "undefined" ? '&pageToken=' + data.nextPageToken : 'NoNewUrl');

            data.items.forEach((curr => {
                const info = {
                    vidTitle: curr.snippet.title,
                    vidUrl: 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId,
                    vidThumbnail: curr.snippet.thumbnails.default.url,
                    date: curr.snippet.publishedAt,

                };
                array.push(info);
                setCount(array.length);
            }))
        }); //end of then(data)
    };


    const pushIt = array.map((vid, idx) =>
        <li title={vid.vidTitle} className='vidlist' ><p className='vidcounter'>{idx}</p><
            div key={idx} className='videoitem'>
            <a className='vidlink' href={vid.vidUrl} target='_blank'>
                <img className='vidimg' src={vid.vidThumbnail} alt='Coffee and Prayer video'></img>
            </a>
            <p>{vid.vidTitle}</p>
        </div></li>
    );
  
    const handleOnInputChange = (event) => {

        if (newUrl === 'DeadEnd') {
            return
        };

        console.log(searchVal.current.value);

        const query = !(searchVal.current.value.length === 0) ? searchVal.current.value : 'empty';
        console.log(query);

        let elements = document.getElementsByTagName('li');
        let eleArray = Array.prototype.slice.call(elements);

        eleArray.filter((item) => {
            console.log(!item.title.includes(query));
            if (!item.title) return item;
            if (item.getAttribute('title').toLowerCase().includes(query.toLowerCase()) === false && query !== 'empty') {
                item.style.display = "none";
            } else {
                item.style.display = "initial";
            }
            return item;
            
        });
        console.log(searchVal.current.value);

        
        };    


return ( 
    <>
     <div className="App">
        <form onSubmit={submitHandler}>
        <input ref={
        inputRef
    }/>
    <button type="submit" > Submit </button > </form>
    <p>Submit Value: <b>{playlistId}</b></p>
        <br/>
        </div>
        
        <input
   type="text"
   ref={searchVal}
   id="search-input"
   placeholder="Search..."/>
    <button type="submit"onClick={handleOnInputChange} > Submit </button >
    <br/><br/>
        <button onClick={() => getVideosPage(newUrl)} >Fetch Videos</button>
        <p key="totalVids">Number of videos loaded: {vidCount} of {totalvids}</p>
        <ul className='videolist'>{pushIt}</ul>
     </>
     )

};

                    export default Format;

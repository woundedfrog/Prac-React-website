import React from 'react';
import '../../App.css';
import '../playlist.css';
import axios from 'axios';
import {
    useRef,
    useState,
    useEffect
} from "react";
import xtype from 'xtypejs';

const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50';
// var playlistId = ''; //'&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk';
const apiUrlEnd = '&key=AIzaSyBOg2M8iFPKIJ9_G9hcxUV56yFFa9icglk';

let array = [];
var count = 0;
// const [vidCount, setCount] = useState(0);
function Format() { // console.log("next___  " + nextPage);
    // console.log("prev___ " + prevPage);
    const [vidCount, setCount] = useState(0);
    const [newUrl, setNewUrl] = useState('');
    const inputRef = useRef('');
    const searchVal = useRef('');
    const [playlistId, setPlaylistId] = useState(inputRef.current.value);
    const [nextPage, setNextPage] = useState('');
    const [prevPage, setPrevPage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        setPlaylistId(inputRef.current.value.length == 0 ? '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk' : '&playlistId=' + inputRef.current.value);
    }

    useEffect(() => {
        (nextPage !== 'NoNewUrl') ? setNewUrl(apiUrl + nextPage + playlistId + apiUrlEnd) : setNewUrl('DeadEnd');
    }, [playlistId, nextPage]);

    const getVideosPage = (nn) => {
        console.log();
        let response;
        if (nn == 'DeadEnd') {
            return
        };
        fetch(nn).then(res => {
            return (!res.ok) ? alert('No valid Url') : response = res.json();

        }).then(data => {
            if (typeof data == "undefined") {
                return;
            }
            setNextPage(typeof data.nextPageToken != "undefined" ? '&pageToken=' + data.nextPageToken : 'NoNewUrl');
            // setPrevPage(typeof data.prevPageToken != "undefined" ? '&pageToken=' + data.prevPageToken : false);

            data.items.forEach((curr => {
                const info = {
                    vidTitle: curr.snippet.title,
                    vidUrl: 'https://www.youtube.com/watch?v=' + curr.snippet.resourceId.videoId,
                    vidThumbnail: curr.snippet.thumbnails.default.url,
                    date: curr.snippet.publishedAt,

                };
                var markup = `<p className='vidcounter'>${count + 1}</p><div key=${count} class='videoitem'><a class='vidlink' href='${info.vidUrl}' target='_blank'><img class='vidimg' src='${info.vidThumbnail}'></img></a><p>${info.vidTitle}</p></div>`;
                array.push(info);
                // document.querySelector('vid').insertAdjacentHTML('beforeend', markup);

                setCount(array.length);
                // return info;
            }))
        }); //end of then(data)
    };
    // console.log(array);


    const pushIt = array.map((vid, idx) =>
        <li title={vid.vidTitle} className='vidlist' ><p className='vidcounter'>{idx}</p><
            div key={idx} className='videoitem'>
            <a className='vidlink' href={vid.vidUrl} target='_blank'>
                <img className='vidimg' src={vid.vidThumbnail}></img>
            </a>
            <p>{vid.vidTitle}</p>
        </div></li>
    );
    
    const [displayState, setDisplayState] = useState('visible');
  
    const handleOnInputChange = (event) => {
        console.log(searchVal.current.value);
        const query = !(searchVal.current.value.length == 0) ? searchVal.current.value : 'empty';
        console.log(query);
        // let vidTags = React.Children.toArray(elements.children).filter((item) => item.props.className.includes(query));
        var elements = document.getElementsByTagName('li');
        var eleArray = Array.prototype.slice.call(elements);
        // elements.style.display = "none";
        // console.log(eleArray);
        eleArray.filter((item) => {
            console.log(!item.title.includes(query));
            if (!item.title) return item;
            if (item.getAttribute('title').toLowerCase().includes(query.toLowerCase()) == false) {
                // console.log( !item.getAttribute('title').toLowerCase().includes(query.toLowerCase()) === true );
                item.style.display = "none";
            
                console.log('i');
            } else {
                item.style.display = "initial";
            }
            
        });
        // console.log(vidTags);
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
    <p>Submit Value: <b>{newUrl}</b></p>
        <br/>
        </div>
        
        <input
   type="text"
   ref={searchVal}
   id="search-input"
   placeholder="Search..."/>
    <button type="submit"onClick={handleOnInputChange} > Submit </button >
        <h2 onClick={() => getVideosPage(newUrl)}>click</h2>
        <p key="totalVids">Number of videos loaded: {vidCount}</p>
        <ul className='videolist'>{pushIt}</ul>
     </>
     )

};

                    export default Format;
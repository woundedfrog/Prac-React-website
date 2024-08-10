import React from 'react';
import '../../App.css';
import '../playlist.css';
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

function Format() {

    const [vidCount, setCount] = useState(0);
    const [totalVids, setTotalVids] = useState(0);
    const [newUrl, setNewUrl] = useState('');
    const inputRef = useRef('');
    const searchVal = useRef('');
    const [playlistId, setPlaylistId] = useState(inputRef.current.value);
    const [nextPage, setNextPage] = useState('');
    let showTHumb = true;
    let showtitle = true;
    // const [prevPage, setPrevPage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        setPlaylistId(inputRef.current.value.length === 0 ? '&playlistId=PLg-QWgQ907Hoz61oESylThb2MK9vPC6rk' : '&playlistId=' + inputRef.current.value);
    }

    useEffect(() => {
        (nextPage !== 'NoNewUrl') ? setNewUrl(apiUrl + nextPage + playlistId + apiUrlEnd) : setNewUrl('DeadEnd');
    }, [playlistId, nextPage]);

    const getVideosPage = (nn) => {

        if (nn === 'DeadEnd') {
            return
        };
        fetch(nn).then(res => {
            return (!res.ok) ? alert('No valid Url') : res.json();

        }).then(data => {
            if (typeof data === "undefined") {
                return;
            }
            // console.log(data);
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
        <li key={idx} title={vid.vidTitle.replace('Coffee & Prayer Bible Study ', '')} className='vidlist' ><p className='vidcounter'>{idx}</p>
        <div className='videoitem'>
            <a className='vidlink' href={vid.vidUrl} target='_blank'>
                <img className='vidimg' src={vid.vidThumbnail} alt='Coffee and Prayer video'></img>
            </a>
            <h3 className='vidname' >{vid.vidTitle.replace('Coffee & Prayer Bible Study ', '')}</h3>
        </div></li>
    );

    const handleOnInputChange = (event) => {

        if (newUrl === 'DeadEnd') {
            return
        };
      

        const query = !(searchVal.current.value.length === 0) ? searchVal.current.value : 'empty';

        let elements = '';
        if (event === 'thumb') {
            // console.log(event);
           elements = document.getElementsByClassName('vidimg');
        } else if (event === 'title') {
            elements = document.getElementsByClassName('vidname');
        } else {
            elements = document.getElementsByTagName('li');
        }

        let eleArray = Array.prototype.slice.call(elements);
        


        eleArray.filter((item) => {
        
            // console.log(elements);
                // console.log(!item.title.includes(query));
            if (event != 'thumb' && event != 'titlehide' && !item.title) return item;
            if (event == "thumb") {
               
               showTHumb ? item.style.display = "none" : item.style.display = "initial";
            } else if (event == 'titlehide') {
               
                // console.log(item);
                showtitle ? item.style.display = "none" : item.style.display = "initial";
             } else if ( item.getAttribute('title').toLowerCase().includes(query.toLowerCase()) === false && query !== 'empty') {
                
                // console.log('hide video');
                item.style.display = "none";
            } else {
                // console.log('show');
                item.style.display = "initial";
            }
            return item;

        });
        
        if (event == 'thumb')  showTHumb = !showTHumb;
        if (event == 'titlehide') showtitle = !showtitle; 
        // console.log(searchVal.current.value);


    };

    return (
        <>
            <div className="app">
                <form onSubmit={submitHandler}>
                    <input ref={inputRef} placeholder='value after "list='/>
                    <button className='btn-primary' type="submit" > Submit </button > </form>
                <p>Submit Value: <b>{playlistId}</b></p>
                <br />
         

            <input
                type="text"
                ref={searchVal}
                id="search-input"
                placeholder="Search..." />
            <button className='btn-primary' type="submit" onClick={handleOnInputChange} > Submit </button >
            <br />
            <br />
            <button className='btn-primary btn-secondary' onClick={() => getVideosPage(newUrl)}>Fetch Videos</button>
            <button className='btn-primary btn-tertiary' onClick={() => handleOnInputChange('thumb')}>Thumbnails (on/off)</button>
            {/* <button className='btn-primary btn-tertiary' onClick={() => handleOnInputChange('titlehide')}>Titles (on/off)</button> */}
            <p key="totalVids">Number of videos loaded: {vidCount} of {totalVids}</p>
            <ul className='videolist'>{pushIt}</ul>
            </div>
        </>
    )

};

export default Format;

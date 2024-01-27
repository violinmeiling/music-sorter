import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const CLIENT_ID = "c5a71d998c634176b0dc265461524ede"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPES = "user-library-read playlist-modify-public playlist-modify-private user-read-private user-read-email"

  const [token, setToken] = useState("")

  const [loaded, setLoaded] = useState("")

  const [showLists, setListView] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

}, [])

const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
}

var artists = []
var trackIDs = ""
const [idparam, setIDs] = useState([])

var songID=null;

const searchArtists = async (e) => {
  trackIDs = ""
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/me/tracks", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          limit: 50
      }
  })

  artists = data.items

  artists.map(song => {
    songID = song.track.id
    trackIDs = trackIDs + songID + ","
  })

  trackIDs = trackIDs.substring(0, trackIDs.length-1)

  setIDs(trackIDs)
  console.log(trackIDs)

  setLoaded(true)

}

var tracklist = []

var yikes1=[]
var yikes2=[]
var yikes3=[]
var yikes4=[]
var yikes5=[]

var audioFeatures = []

var feature = ""

var firstlist = []
var secondlist = []
var thirdlist = []
var fourthlist = []
var fifthlist = []

const [listOne, setOne] = useState([])
const [listTwo, setTwo] = useState([])
const [listThree, setThree] = useState([])
const [listFour, setFour] = useState([])
const [listFive, setFive] = useState([])



const handleClick= event => {
  feature = event.currentTarget.id;
}

const[label, setLabel] = useState([])

const getFeatures = async (d) => {
  
  d.preventDefault()
  tracklist = await axios.get("https://api.spotify.com/v1/audio-features", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          ids: idparam
      }
  })

  audioFeatures = tracklist.data.audio_features

  console.log(feature)
  
  var value = 0

  firstlist = []
  secondlist = []
  thirdlist = []
  fourthlist = []
  fifthlist = []

  var fetchfirst = ""
  var fetchsecond = ""
  var fetchthird = ""
  var fetchfourth = ""
  var fetchfifth = ""

  if (feature == "acousticness") {
    setLabel("Least acoustic to most acoustic")
    audioFeatures.map(artist => {
      value = artist.acousticness;
      if (value < 0.2) {
        fetchfirst = fetchfirst + artist.id + ","
      }
      if (value < 0.4 && value >= 0.2) {
        fetchsecond = fetchsecond + artist.id + ","      }
      if (value < 0.6 && value >= 0.4) {
        fetchthird = fetchthird + artist.id + ","      }
      if (value < 0.8 && value >= 0.6) {
        fetchfourth = fetchfourth + artist.id + ","      }
      if (value < 1 && value >= 0.8) {
        fetchfifth = fetchfifth + artist.id + ","      }
    })
  }  

  if (feature == "danceability") {
    setLabel("Least danceable to most danceable")
    audioFeatures.map(artist => {
      value = artist.danceability;
      if (value < 0.2) {
        fetchfirst = fetchfirst + artist.id + ","
      }
      if (value < 0.4 && value >= 0.2) {
        fetchsecond = fetchsecond + artist.id + ","      }
      if (value < 0.6 && value >= 0.4) {
        fetchthird = fetchthird + artist.id + ","      }
      if (value < 0.8 && value >= 0.6) {
        fetchfourth = fetchfourth + artist.id + ","      }
      if (value < 1 && value >= 0.8) {
        fetchfifth = fetchfifth + artist.id + ","      }
    })
  }  
  if (feature == "energy") {
    setLabel("Least energetic to most energetic")
    audioFeatures.map(artist => {
      value = artist.energy;
      if (value < 0.2) {
        fetchfirst = fetchfirst + artist.id + ","
      }
      if (value < 0.4 && value >= 0.2) {
        fetchsecond = fetchsecond + artist.id + ","      }
      if (value < 0.6 && value >= 0.4) {
        fetchthird = fetchthird + artist.id + ","      }
      if (value < 0.8 && value >= 0.6) {
        fetchfourth = fetchfourth + artist.id + ","      }
      if (value < 1 && value >= 0.8) {
        fetchfifth = fetchfifth + artist.id + ","      }
    })
  }  

  if (feature == "speechiness") {
    setLabel("Least speechy to most speechy")
    audioFeatures.map(artist => {
      value = artist.speechiness;
      if (value < 0.2) {
        fetchfirst = fetchfirst + artist.id + ","
      }
      if (value < 0.4 && value >= 0.2) {
        fetchsecond = fetchsecond + artist.id + ","      }
      if (value < 0.6 && value >= 0.4) {
        fetchthird = fetchthird + artist.id + ","      }
      if (value < 0.8 && value >= 0.6) {
        fetchfourth = fetchfourth + artist.id + ","      }
      if (value < 1 && value >= 0.8) {
        fetchfifth = fetchfifth + artist.id + ","      }
    })
  }  

  if (feature == "valence") {
    setLabel("Least positive to most positive")
    audioFeatures.map(artist => {
      value = artist.valence;
      if (value < 0.2) {
        fetchfirst = fetchfirst + artist.id + ","
      }
      if (value < 0.4 && value >= 0.2) {
        fetchsecond = fetchsecond + artist.id + ","      }
      if (value < 0.6 && value >= 0.4) {
        fetchthird = fetchthird + artist.id + ","      }
      if (value < 0.8 && value >= 0.6) {
        fetchfourth = fetchfourth + artist.id + ","      }
      if (value < 1 && value >= 0.8) {
        fetchfifth = fetchfifth + artist.id + ","      }
    })
  }  

  if (fetchfirst.length != 0) {
    fetchfirst = fetchfirst.substring(0, fetchfirst.length-1)
    d.preventDefault()
    yikes1 = await axios.get("https://api.spotify.com/v1/tracks", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            ids: fetchfirst
        }
    })
    firstlist=yikes1.data.tracks
  }
  

  if (fetchsecond.length != 0) {
    fetchsecond = fetchsecond.substring(0, fetchsecond.length-1)
    d.preventDefault()
    yikes2 = await axios.get("https://api.spotify.com/v1/tracks", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            ids: fetchsecond
        }
    })
  
    secondlist=yikes2.data.tracks
  }
  
if (fetchthird.length != 0) {
  fetchthird = fetchthird.substring(0, fetchthird.length-1)
  d.preventDefault()
  yikes3 = await axios.get("https://api.spotify.com/v1/tracks", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          ids: fetchthird
      }
  })

  thirdlist=yikes3.data.tracks
}
  
if (fetchfourth.length != 0) {
  fetchfourth = fetchfourth.substring(0, fetchfourth.length-1)
  d.preventDefault()
  yikes4 = await axios.get("https://api.spotify.com/v1/tracks", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          ids: fetchfourth
      }
  })

  fourthlist=yikes4.data.tracks
}
  
if (fetchfifth.length != 0) {
  fetchfifth = fetchfifth.substring(0, fetchfifth.length-1)
  d.preventDefault()
  yikes5 = await axios.get("https://api.spotify.com/v1/tracks", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          ids: fetchfifth
      }
  })

  fetchfifth=yikes5.data.tracks 
}
  

  setOne(firstlist.map(item => <div>{item.name}</div>))
  setTwo(secondlist.map(item => <div>{item.name}</div>))
  setThree(thirdlist.map(item => <div>{item.name}</div>))
  setFour(fourthlist.map(item => <div>{item.name}</div>))
  setFive(fifthlist.map(item => <div>{item.name}</div>))
  setListView(true)
}

const makePlaylist = async (e) => {
  e.preventDefault()
  const {userdata} = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
      }
  })
  const userid = userdata.id

  const {playlistdata} = await axios.post("https://api.spotify.com/v1/users/{user_id}/playlists", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
        user_id: userid
      },
      body: {
        "name": "New Playlist",
        "description": "New playlist description",
        "public": false
    }
  })

  const playlistid = playlistdata.id

  await axios.post("https://api.spotify.com/v1/playlists/{playlist_id}/tracks", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
        playlist_id: playlistid,
        position: 0,
      },
      body: {
        "name": "New Playlist",
        "description": "New playlist description",
        "public": false
    }
  })

}

  return (
    <div className="App">
      <header className="App-header">
          Sort Your Music
        <p class="sectiontext">
          Sort your top 50 saved tracks into playlists based on their properties.
        </p>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}> 
                    <input type="submit" value="Log in with Spotify &#127925;" class = "btn"/>
                    </a>
                    : <form onSubmit={searchArtists}>
                    <button type={"submit"} class="btn">Load songs</button>
                </form>}

{loaded ?

                <div>

                  <p class="sectiontext">Choose one:</p>

                  <form onSubmit={getFeatures}>
    <button type={"submit"} class="btn" id="acousticness" onClick={handleClick}>Acousticness</button>&nbsp;&nbsp;
    <button type={"submit"} class="btn" id="danceability" onClick={handleClick}>Danceability</button>&nbsp;&nbsp;
    <button type={"submit"} class="btn" id="energy" onClick={handleClick}>Energy</button>&nbsp;&nbsp;
    <button type={"submit"} class="btn" id="speechiness" onClick={handleClick}>Speechniess</button>&nbsp;&nbsp;
    <button type={"submit"} class="btn" id="valence" onClick={handleClick}>Positivity</button>

</form>

{showLists ? 
<div>
<p class="sectiontext">{label}</p>
<div class="list_container">

<div class="column">
  
                    <p><span style={{color: "hotpink"}}>&#10084; &#10084; &#10084;</span></p>
                    {listOne}
                    </div>
                    
                    <div class="column">
                    <p>	<span style={{color: "orange"}}>&#10084; &#10084; &#10084;</span></p>
                    {listTwo}
                    </div>
                    
                    <div class="column">
                    <p>	<span style={{color: "gold"}}>&#10084; &#10084; &#10084;</span></p>
                    {listThree}
                    </div>
                    
                    <div class="column">
                    <p>	<span style={{color: "lightgreen"}}>&#10084; &#10084; &#10084;</span></p>
                    {listFour}
                    </div>
                   
                   <div class="column">
                   <p>	<span style={{color: "cyan"}}>&#10084; &#10084; &#10084;</span></p>
                    {listFive}
                   </div>
</div>
</div>

: ""}
                    
                    
                </div>
                    
              
                
                : ""}  



      </header>
    </div>
  );
}

export default App;

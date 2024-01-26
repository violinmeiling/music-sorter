import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {

  const CLIENT_ID = "c5a71d998c634176b0dc265461524ede"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPES = "user-library-read playlist-modify-public"

  const [token, setToken] = useState("")

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

const [artists, setArtists] = useState([])
var [trackIDs, setIDs] = useState([])

var songID=null;

const searchArtists = async (e) => {
  trackIDs = ""
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/me/tracks", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          limit: 5
      }
  })

  setArtists(data.items)

  console.log(artists)

  artists.map(song => {
    songID = song.track.id
    trackIDs = trackIDs + songID + ","
    console.log(trackIDs)
  })

  trackIDs = trackIDs.substring(0, trackIDs.length-1)
  console.log("ids:" + trackIDs)
  setIDs(trackIDs)
}

const [tracklist, setTracks] = useState([])

const getFeatures = async (d) => {
  d.preventDefault()
  console.log(await axios.get("https://api.spotify.com/v1/audio-features", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          ids: trackIDs
      }
  }))

  

}

var property = null
const firstlist = []
var value = null;


function renderArtists(feature) {
  if (feature == "acousticness") {
    console.log("hey")
    tracklist.map(artist => {
      value = artist.track.acousticness;
      console.log(artist.track.name)
      if (value < 1) {
        firstlist.push(artist.track.name)
      }
      console.log(firstlist)
    })
  }
  
  return firstlist.map(artist => (
      <div key={artist}>
          {artist}
      </div>      
  ))
}

function get_feature(id) {
  property = id;
  console.log(property);
  {renderArtists(property)}

  
}

const handleClick = event => {
  get_feature(event.currentTarget.id);
};


  return (
    <div className="App">
      <header className="App-header">
          Sort Your Music
        <p>
          Sort your saved tracks into playlists based on their properties.
        </p>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}> 
                    <input type="submit" value="Log in with Spotify &#127925;" class = "btn"/>
                    </a>
                    : <button onClick={logout} class="btn">Logout</button>}

{token ?
                
                

                <div>

<form onSubmit={searchArtists}>
    <button type={"submit"} class="btn">Load songs</button>
</form>

                  <p>Sort your music based on:</p>

                  <form onSubmit={getFeatures}>
    <button type={"submit"} class="btn" id="acousticness">Acousticness</button>
</form>

                    <button class="btn" id="danceability" onClick={handleClick}>Danceability</button>
                    <button class="btn" id="energy" onClick={handleClick}>Energy</button>
                    <button class="btn" id="speechiness" onClick={handleClick}>Speechiness</button>
                    <button class="btn" id="valence" onClick={handleClick}>Positivity</button>
                </div>
                    
              
                
                : ""}  

{renderArtists()}

      </header>
    </div>
  );
}

export default App;

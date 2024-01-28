import './App.css';
import {useEffect, useState} from 'react';
import React from 'react';
import MainGroup from './MainGroup';
import Button from './Button';
import spotifyLogo from './spotifyLogo.png';

function App() {
    // The constants
    const clientId = '209e9420de61407fb540e5280287a4bf';
    const redirectUri = 'https://katie-ar.github.io/pie-chart-tunes/';

    // The state variable storing the access token
    const [accessToken, setToken] = useState("");

    // Code verifier function
    function generateRandomString(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    // Code challenge function
    async function generateCodeChallenge(codeVerifier) {
        function base64encode(string) {
          return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        }
      
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
      
        return base64encode(digest);
    }

    // Requests the user authorisation code when the user clicks the login button
    const userAuthorisation = async () => {
        const code_verifier = generateRandomString(128);
        const code_challenge = await generateCodeChallenge(code_verifier);

        let state = generateRandomString(16);
        let scope = 'user-top-read';

        localStorage.setItem('code_verifier', code_verifier);

        let args = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: code_challenge
        });

        window.location = 'https://accounts.spotify.com/authorize?' + args;
    }

    // Removes all data from local storage and clears the access token state variable when the user clicks the logout button
    const logout = () => {
      setToken("");
      localStorage.clear();
      window.location.reload(false);
    }

    // After the user has given permission, the access token is requested on returning to the webpage
    useEffect (() => {
        if (localStorage.getItem('code_verifier') && !localStorage.getItem('access_token')){
        const urlParams = new URLSearchParams(window.location.search);
        localStorage.setItem('code',(urlParams.get('code')));

        let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: localStorage.getItem('code'),
            redirect_uri: redirectUri,
            client_id: clientId,
            code_verifier: localStorage.getItem('code_verifier')
          });

          const response = fetch('https://accounts.spotify.com/api/token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: body
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error('HTTP status ' + response.status);
                }
                return response.json();
              })
              .then(data => {
                localStorage.setItem('access_token', data.access_token);
                setToken(data.access_token)
              })
              .catch(error => {
                console.error('Error:', error);
              });
        }
        else if (localStorage.getItem('code_verifier') && localStorage.getItem('access_token')) {
          setToken(localStorage.getItem('access_token'));
        }
    }, []);

    // Displays the page
    return (
        <div className='App'>
            <header className='App-header'>
                <p id="mainHeader">pie chart tunes</p>
                {!accessToken ?
                <Button class="authButton" onClick={userAuthorisation}>
                    Log in to Spotify
                </Button>:
                <div>
                    <div>
                    <MainGroup/>
                    </div>
                    <div>
                      <Button onClick={logout}>
                        Log out from Spotify
                      </Button>
                    </div>
                </div>
                }
                <div id="footer">
                  <img src={spotifyLogo} alt="Spotify's logo"/>
                  <p>Data from Spotify used:</p>
                  <ul>
                    <li>Song popularity and length from your top songs (from the selected time range)</li>
                    <li>The genres of your top artists (from the selected time range)</li>
                  </ul>
                </div>
            </header>   
        </div>   
    )
}

export default App;
import React, { Component } from "react";
import { connect } from "react-redux";

import LoadingPage from "../loading/loading.component";

import MusicPlayer from "../../components/music-player/music.player.component";

import { postDSSong } from "../../redux/ds/ds.actions";
import {
  getSeveralTracks,
  getSpotifyUser,
  getCurrentSong
} from "../../redux/spotify/spotify.actions";
// Styling
import "../../App.css";
import { transferPlaybackHere } from "../../utils/playerActions";

class Dashboard extends Component {
  state = {
    collapse: false,
    popout: false,
    playlistCreated: false
  };

  componentDidMount() {
    const { postDSSong, getSpotifyUser, getCurrentSong } = this.props;
    const token = localStorage.getItem("token");

    getSpotifyUser();
    postDSSong(token);
  }

  componentDidUpdate() {
    const { dsSongsData, getSeveralTracks, getCurrentSong } = this.props;

    this.initializePlayer();
    getCurrentSong();
    this.player.setVolume(0.5);
    getSeveralTracks(dsSongsData);
  }

  // this is needed in order to get a device id to transfer playback to browser
  initializePlayer = () => {
    const { getCurrentSong } = this.props;
    const token = localStorage.getItem("token");

    this.player = new window.Spotify.Player({
      name: "Sound Drip Spotify Player",
      getOAuthToken: cb => {
        cb(token);
      }
    });

    this.player.on("player_state_changed", spotifyState => {
      getCurrentSong(spotifyState);
    });

    this.player.on("ready", data => {
      const { device_id } = data;

      transferPlaybackHere(token, device_id);
    });

    this.player.connect();
  };

  logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.history.push("/logout");
  };

  render() {
    return (
      <div className="dashboard">
        {this.props.fetchingDsSongs ? (
          <div>
            <MusicPlayer />
          </div>
        ) : (
          <LoadingPage />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dsSongsData: state.dsSongs.dsSongsData
});

export default connect(mapStateToProps, {
  postDSSong,
  getSeveralTracks,
  getSpotifyUser,
  getCurrentSong
})(Dashboard);

import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { getTrackInfo } from '../../Redux/Spotify/spotify.actions';
import '../../App.css';
import axios from 'axios';

class Song extends React.Component {
  constructor(props) { 
    super(props);
  }

  msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if (secs === 0) {
      return mins + ':' + '00'
    } else if (secs < 10) {
      return mins + ':' + '0' + secs;
    } else { 
      return mins + ':' + secs;
    }
  }

  // changeSong(props) {
  //   console.log("changeSong", props)
  //   var config = {
  //     headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
  //   };

  //   // axios.get(
  //   //   `https://api.spotify.com/v1/audio-features/${this.props.song.id}`,
  //   //   config,
  //   // );
  // }

  render() {
    /*     const tf = this.props.tracksInfo[this.props.id]; */
  /*    const loadingTf = !tf || tf.fetching; */
    const changeSong = () => {
      console.log("changeSong", this.props.tracks)
      const trackArray = [`${this.props.song.uri}`]
      trackArray.push()
      axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${this.props.deviceId}`,
        {
          "uris": [`${this.props.song.uri}`, "spotify:track:2LMVHQH7NIWOZOcnleT4CE"],
        },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
      )
    }

    return (
      <div>
        <Grid
          container
          direction='row'
          alignItems='center'
          wrap='wrap'
          className='song'>
          <Grid item>
          <button
            style={{
            background: "none",
            border: "none",
            outline: "none",
            marginRight: '12px',
            marginLeft: '12px'
            }}
        >
            {"playing" ? (
                <a onClick={changeSong} className="pauseicon" style={{ maxHeight: 35 }} />
            ) : (
            <a className="playicon" style={{ maxHeight: 35 }} />
            )}
            </button>
            </Grid>
          <Grid item style={{ padding: 5 }}>
            <img style={{ borderRadius: '5px', marginRight: '20px'}}
              src={this.props.song.album.images[2].url}
              alt='album art'
              width='64px'
            />
          </Grid>
          <Grid item style={{ padding: 5, width: '200px'}}>
            <Typography
              style={{ fontSize: 13, fontWeight: 'bold', marginBottom: '3px' }}
              direction='row'>
              {this.props.song.name}
            </Typography>
            <Typography style={{ fontSize: 13 }}>
              {this.props.song.artists[0].name}
            </Typography>
            <Typography style={{ fontSize: 13 }}>
              {console.log("inside songjs", this.props)}
            </Typography>
            {/* <p>Audio Features: {loadingTf ? 'loading....' : tf.data.tempo}</p> */}
          </Grid>
          <Grid item style={{ padding: 5, fontSize: 13, width: '200px', marginRight: '10px'}}>
            {this.props.song.album.name}
          </Grid>
          <Grid item style={{ padding: 5, fontSize: 13, width: '50px' }}>
            {this.msToTime(this.props.song.duration_ms)}
          </Grid>

        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tracksInfo: state.getTrackInfoReducer,
});

export default connect(
  mapStateToProps,
  { getTrackInfo },
)(Song);

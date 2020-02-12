import React, { useState } from "react";
import AudioDetails from "./AudioDetails"
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Chart from "../Chart";
import AudioDetailsStyles from './element-styles/AudioDetailsStyles';

const AudioDetailsContainer = props => {

const [collapse, setCollapse] = useState(false)
  const { traits } = props;

  const openAudioDetails = () => {
    setCollapse(!collapse)
  }

  return (
    <AudioDetailsStyles>
      <div className="audioDiv">
            <button
        onClick={() => openAudioDetails()}
        className='grid-question grid-chart joyride-3 pinkhover'
        title='Click for Audio Features details'
        style={{ margin: 0, borderRadius: "6px", backgroundColor: "#1E2024", color: "white", border: "none", fontSize: "12px", height: "30px" }}
      >
        <a className="vectoricon" style={{ maxHeight: 35 }} />
      </button>
      </div>
      <List>
      <Paper
        className={
          collapse
            ? "audio-details-open"
            : "audio-details-closed"
        }
        style={{
          maxHeight: 400,
          width: 377,
          overflow: "auto",
          backgroundColor: "#E20351",
          color: "lightgray"
        }}
      >
        <AudioDetails />
      </Paper>
    </List>
    <Grid item>

    <Chart
      features={traits}
      style={{ width: "100%", objectFit: "scale-down" }}
        />
            <div style={{ textAlign: "center", marginTop: "10px" }}>
    </div>
    
      </Grid>
      </AudioDetailsStyles>
  );
};

export default AudioDetailsContainer

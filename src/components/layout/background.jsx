import React from "react";
import ReactPlayer from 'react-player';
import { SoundsPlayer } from '../player/player';

export const LFBackground = () => {
  return (
    <div className="lf-background">
      <div className="bg-container">
        <SoundsPlayer/>

      </div>
    </div>
  )
}

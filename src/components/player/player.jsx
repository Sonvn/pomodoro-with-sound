import React from 'react';
import ReactPlayer from 'react-player';
import { createStateHolder } from '../../common/state-holder';
import { sounds } from './configs';

const key = 'liofo-music';
let defaultMusicState = {
  url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
  volume: 1,
  backgroundSounds: {}
};

let initState = defaultMusicState;

try {
  initState = JSON.parse(localStorage.getItem(key)) ?? defaultMusicState;
} catch (e) {}

export const musicPlayer = createStateHolder(initState);

musicPlayer.updateSound = (soundName, update) => {
  const state = musicPlayer.getState();
  const currentSound = state.backgroundSounds[soundName] ?? {
    isEnabled: false,
    volume: 0.5
  }

  musicPlayer.setState({
    ...state,
    backgroundSounds: {
      ...state.backgroundSounds,
      [soundName]: {
        ...currentSound,
        ...update
      }
    }
  })
}

musicPlayer.updateMusic = (url) => {
  const state = musicPlayer.getState();

  musicPlayer.setState({
    ...state,
    url,
  })
}

export class SoundsPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlayingAlarm: false
    }
  }

  componentDidMount() {
    this.removeListener = musicPlayer.onChange((state) => {
      localStorage.setItem(key, JSON.stringify(state));
      this.forceUpdate();
    });

    musicPlayer.playAlarm = () => {
      this.setState({isPlayingAlarm: true}, () => {
        setTimeout(() => {
          this.setState({isPlayingAlarm: false})
        }, 2000);
      })
    }
  }

  componentWillUnmount() {
    this.removeListener?.();
  }

  render() {
    const {isPlayingAlarm} = this.state;
    const { url, volume, backgroundSounds } = musicPlayer.getState();
    return (
      <>
        <ReactPlayer
          className="youtube-player"
          playing
          loop
          url={url}
          volume={volume}
        />
        {isPlayingAlarm && (
          <ReactPlayer
            className="alarm-player"
            playing
            url="/sounds/alarm-digital-watch.mp3"
            volume={volume}
          />
        )}

        <div className="background-sounds">
          {sounds.map(s => backgroundSounds[s.name]?.isEnabled ? (
            <ReactPlayer
              key={'sound-player-' + s.name}
              className="sound-player"
              url={s.file}
              playing={backgroundSounds[s.name]?.isEnabled ?? false}
              volume={backgroundSounds[s.name]?.volume ?? 0.5}
              loop
            />
          ) : null)}
        </div>
      </>
    );
  }
}

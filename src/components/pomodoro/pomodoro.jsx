import './pomodoro.scss';

import React from 'react';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PomodoroContext } from './pomodoro-context';

export class Pomodoro extends React.Component {
  static contextType = PomodoroContext;

  constructor(props) {
    super(props);
  }

  parseTime = (timerValue) => {
    let minutes = Math.floor(timerValue / 60);
    let seconds = timerValue - (minutes * 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  render() {
    const { state, start, stop, pause, resume } = this.context;
    return (
      <div className="pomodoro-fv4">

        {state.isStarted ? (
          <>
            {state.isPaused ? (
              <FontAwesomeIcon icon={faPlay} onClick={() => resume()} size="xs" />
            ) : (
              <FontAwesomeIcon icon={faPause} onClick={() => pause()} size="xs" />
            )}
            <FontAwesomeIcon icon={faStop} onClick={() => stop()} size="xs" />
          </>
        ) : (
          <FontAwesomeIcon icon={faPlay} onClick={() => start()} size="xs" />
        )}
        {/*<button onClick={() => reset()}>reset</button>*/}

        <div className="time-remaining">{this.parseTime(state.timeRemaining)}</div>
      </div>
    );
  }
}

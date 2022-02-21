import React from 'react';
import { timer } from '../../common/timer';
import { musicPlayer } from '../player/player';

export const PomodoroContext = React.createContext(null);

PomodoroContext.displayName = 'PomodoroContext';

const TIMER_TYPES = {
  SESSION: 'session',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
}

const defaultSettings = {
  session: 25,
  shortBreak: 5,
  longBreak: 15,
}
// const defaultSettings = {
//   session: 0.1,
//   shortBreak: 0.1,
//   longBreak: 15,
// }

export class PomodoroProvider extends React.Component {
  removeListener = null;

  constructor(props) {
    super(props);

    const configs = defaultSettings;

    this.state = {
      configs,
      isPaused: false,
      isStarted: false,
      timeRemaining: configs.session * 60,
      sessionCount: 0,
      timerType: TIMER_TYPES.SESSION
    }
  }

  componentDidMount() {
    this.removeListener = timer.onTick(() => {
      const {isPaused, isStarted, timeRemaining, timerType, sessionCount, configs} = this.state;

      if (!isPaused && isStarted) {
        const _timeRemaining = timeRemaining - 1;
        const isSwitchTimerType = _timeRemaining < 0;

        const nextTimerType = isSwitchTimerType ? timerType == TIMER_TYPES.SESSION ? TIMER_TYPES.SHORT_BREAK : TIMER_TYPES.SESSION : timerType

        const newState = {
          timeRemaining: isSwitchTimerType ? configs[nextTimerType] * 60 : _timeRemaining,
          sessionCount: sessionCount + (timerType == TIMER_TYPES.SESSION && isSwitchTimerType ? 1 : 0),
          timerType: nextTimerType
        };

        if(_timeRemaining == 2) {
          musicPlayer.playAlarm?.();
        }

        this.setState(newState);
      }
    })
  }

  componentWillUnmount() {
    this.removeListener?.();
  }

  render() {
    const {children} = this.props;
    const {configs, isStarted} = this.state;

    return (
      <PomodoroContext.Provider
        value={{
          state: this.state,
          updateConfigs: (newConfigs) => !isStarted && this.setState({
            configs: newConfigs,
            timeRemaining: configs[TIMER_TYPES.SESSION] * 60,
            sessionCount: 0,
            timerType: TIMER_TYPES.SESSION,
          }),
          pause: () => this.setState({isPaused: true}),
          resume: () => this.setState({isPaused: false}),
          start: () => this.setState({isStarted: true}),
          stop: () => this.setState({
            isStarted: false,
            isPaused: false,
            timeRemaining: configs[TIMER_TYPES.SESSION] * 60,
            timerType: TIMER_TYPES.SESSION,
          }),
          reset: () => this.setState({
            isStarted: false,
            isPaused: false,
            timeRemaining: configs[TIMER_TYPES.SESSION] * 60,
            sessionCount: 0,
            timerType: TIMER_TYPES.SESSION,
          }),
        }}
      >
        {children}
      </PomodoroContext.Provider>
    );
  }
}

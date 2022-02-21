import React from 'react';
import { classNames } from '../../common/utils';
import { sounds } from './configs';
import { musicPlayer } from './player';

export class SoundSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.removeListener = musicPlayer.onChange((state) => {
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    this.removeListener?.();
  }

  render() {
    const {backgroundSounds} = musicPlayer.getState();
    return (
      <div className="options">
        {sounds.map(s => {
          const config = backgroundSounds[s.name];
          return (
            <div className="item" key={s.name}>
            <span
              className={classNames({
                active: config?.isEnabled
              })}
              onClick={() => musicPlayer.updateSound(s.name, {isEnabled: !config?.isEnabled})}
            />
              <div className="label">
                {s.name}
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={(config?.volume ?? 50) * 100}
                onChange={(e) => musicPlayer.updateSound(s.name, {volume: e.target.value / 100})}
              />
            </div>
          )
        })}
      </div>
    );
  }
}

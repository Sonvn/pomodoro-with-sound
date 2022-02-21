import React from 'react';

import { LFBackground } from './components/layout/background';
import { LFLayout } from './components/layout/layout';
import { SoundSettings } from './components/player/sound-settings';
import { Pomodoro } from './components/pomodoro/pomodoro';
import { PomodoroProvider } from './components/pomodoro/pomodoro-context';
import { Tabs } from './components/tabs/tabs';
import { Todo } from './components/todo/todo';

export function App() {
  return (
    <LFLayout
      background={(
        <LFBackground/>
      )}
    >
      <PomodoroProvider>
        <Tabs
          list={[
            {
              id: 'main-screen',
              name: 'Main',
              noBackground: true,
              render: () => (
                <>
                  <ul className="pip-head">
                    <li><b>Pomodoro</b> <Pomodoro/></li>
                    <li><b>Tasks</b> <Todo/></li>
                  </ul>
                </>
              ),
            },
            {
              id: 'sounds-screen',
              name: 'Setting',
              render: () => (
                <div className="pip-body">
                  <SoundSettings/>
                </div>
              ),
            },
          ]}
        />
      </PomodoroProvider>
    </LFLayout>
  );
}

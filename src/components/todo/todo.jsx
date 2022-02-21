import './todo.scss';

import React from 'react';
import { createStateHolder } from '../../common/state-holder';

const key = 'liofo-todo';
let initState = [];

try {
  initState = JSON.parse(localStorage.getItem(key)) ?? [];
} catch (e) {}

const todoState = createStateHolder(initState);

export class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    }
  }

  componentDidMount() {
    this.removeListener = todoState.onChange((state) => {
      localStorage.setItem(key, JSON.stringify(state));
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    this.removeListener?.();
  }

  toggleCompleted = (id) => {
    const list = todoState.getState();
    todoState.setState(list.map(item => ({
        ...item,
        isCompleted: item.id == id ? !item.isCompleted : item.isCompleted
      }))
    );
  }

  delete = (id) => {
    const list = todoState.getState();
    todoState.setState(list.filter(item => item.id != id));
  }

  add = (text) => {
    const list = todoState.getState();
    todoState.setState(list.concat({
      id: Date.now(),
      text,
    }));
  }

  render() {
    const {text} = this.state;
    const list = todoState.getState();

    return (
      <div className="todo-fcv3">
        <div>
          <input type="text" value={text} onChange={e => this.setState({text: e.target.value})}/>
          <button onClick={() => this.add(text)}>Add</button>
        </div>
        <div>
          <div className="section-title">Active tasks</div>
          <ul>
            {list.filter(item => !item.isCompleted).length == 0 && (
              'No task'
            )}
            {list.filter(item => !item.isCompleted).map(item => (
              <li key={item.id}>
                {item.text}

                <span className="todo-item-icon" onClick={() => this.toggleCompleted(item.id)}>✅</span>
                <span className="todo-item-icon" onClick={() => this.delete(item.id)}>❌</span>
              </li>
            ))}
          </ul>
        </div>
        {list.filter(item => item.isCompleted).length > 0 && (
          <div>
            <div className="section-title">Completed tasks</div>
            <ul>
              {list.filter(item => item.isCompleted).map(item => (
                <li key={item.id}>
                  <s>{item.text}</s>

                  <span className="todo-item-icon" onClick={() => this.toggleCompleted(item.id)}>✅</span>
                  <span className="todo-item-icon" onClick={() => this.delete(item.id)}>❌</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

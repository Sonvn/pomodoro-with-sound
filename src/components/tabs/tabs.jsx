import './tabs.scss';

import React from 'react';
import { classNames } from '../../common/utils';

export class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: props.list?.[0] || null,
      isDisplay: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isDisplay: true});
    }, 1000)
  }

  render() {
    const {list} = this.props;
    const {currentTab, isDisplay} = this.state;

    return isDisplay && (
      <div id="frame" className="frame">
        <div className={classNames(
          "piece output container",
          {
            "no-bg": currentTab?.noBackground
          }
        )}>
          <div className="pipboy">
            <ul className="pip-foot">
              {list.map(tab => (
                <React.Fragment key={tab.name}>
                  <div className="fixed-line"/>
                  <li className={currentTab.name == tab.name ? "active" : ''} onClick={() => this.setState({currentTab: tab})}><a >{tab.name}</a></li>
                </React.Fragment>
              ))}
              <div className="space"/>
            </ul>

            {currentTab && (
              <div className="tab-content">
                <div className="tab-pane fade">
                  <h3 className="pip-title">{currentTab.name}</h3>
                  {currentTab.render()}
                </div>
              </div>
            )}
          </div>

          <div className="piece glow no-click"/>
        </div>
      </div>
    );
  }
}

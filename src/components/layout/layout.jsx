import './layout.scss';

import React from 'react';

import { classNames } from '../../common/utils';

export class LFLayout extends React.Component {
  canvasElem = null;
  requestID = null;

  constructor(props) {
    super(props);

    this.state = {
      isTurnOn: false,
    }
  }

  componentDidMount() {
    const ctx = this.canvasElem.getContext('2d');
    const ww = window.innerWidth;

    // Set canvas size
    this.canvasElem.width = ww / 3;
    this.canvasElem.height = (ww * 0.5625) / 3;

    // Generate CRT noise
    const snow = () => {
      const ww = window.innerWidth;

      // Set canvas size
      this.canvasElem.width = ww / 3;
      this.canvasElem.height = (ww * 0.5625) / 3;
      const w = ctx.canvas.width,
        h = ctx.canvas.height,
        d = ctx.createImageData(w, h),
        b = new Uint32Array(d.data.buffer),
        len = b.length;

      for (let i = 0; i < len; i++) {
        b[i] = ((255 * Math.random()) | 0) << 24;
      }

      ctx.putImageData(d, 0, 0);
    }

    const animate = () => {
      snow();
      this.requestID = requestAnimationFrame(animate);
    };

    setTimeout(() => {
      this.setState({isTurnOn: true})
      animate();
    }, 1000);
  }

  componentWillUnmount() {
    if (this.requestID) {
      window.cancelAnimationFrame(this.requestID);
      this.requestID = undefined;
    }
  }

  render() {
    const {isTurnOn} = this.state;
    const {children, background} = this.props;

    return (
      <main className={classNames("scanlines", isTurnOn ? "on" : "off")}>
        <div className="screen">
          <canvas ref={elem => this.canvasElem = elem} className="picture"/>
          {isTurnOn && background}

          <div className="overlay">
            {isTurnOn && children}
            {/*<div className="text">*/}
            {/*  <span>AV-1</span>*/}
            {/*  <span>AV-1</span>*/}
            {/*  <span>AV-1</span>*/}
            {/*  <span>AV-1</span>*/}
            {/*  <span>AV-1</span>*/}
            {/*</div>*/}
          </div>
        </div>
      </main>
    );
  }
}

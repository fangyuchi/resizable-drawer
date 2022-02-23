import React from 'react';
import {  BackTop } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Doc from './docs/Drawer';

const Content = () => {
  const backtotop = React.useRef(null);
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const anchorId = hash.substring(1);
      document.getElementById(decodeURIComponent(anchorId))?.scrollIntoView();
    }
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ padding: 48, flex: 1, overflowY: 'auto' }} ref={backtotop}>
        <Doc />
      </div>
      <BackTop target={() => backtotop.current} />
    </div>
  );
};

const Demo = () => {

  return (
    <Router>
      <Content />
    </Router>
  );
};

export default Demo;

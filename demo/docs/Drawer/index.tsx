import React from 'react';
import {
  Button
} from 'antd';
import Drawer from '../../../src/Drawer';
import { 
  Section, 
} from '../../components';

const Doc = () => {
  const [ visible11, setVisible11 ] = React.useState(false);
  const [ visible12, setVisible12 ] = React.useState(false);
  const [ visible2, setVisible2 ] = React.useState(false);
  const [ visible3, setVisible3 ] = React.useState(false);
  const [ visible41, setVisible41 ] = React.useState(false);
  const [ visible42, setVisible42 ] = React.useState(false);
  const [ visible43, setVisible43 ] = React.useState(false);
  const [ visible44, setVisible44 ] = React.useState(false);

  return (
    <>
      <Section title="可调整尺寸">
          <div style={{ margin: '16px 0' }}>
            placement&nbsp;
            <Button type="primary" onClick={() => setVisible41(true)}>top</Button>&nbsp;
            <Button type="primary" onClick={() => setVisible42(true)}>right</Button>&nbsp;
            <Button type="primary" onClick={() => setVisible43(true)}>bottom</Button>&nbsp;
            <Button type="primary" onClick={() => setVisible44(true)}>left</Button>
            <Drawer 
              placement="top"
              visible={visible41} 
              onClose={() => setVisible41(false)} 
              resizable
            />
            <Drawer 
              placement="right"
              visible={visible42} 
              onClose={() => setVisible42(false)} 
              resizable
              mask
            >
              
            </Drawer>
            <Drawer 
              placement="bottom"
              visible={visible43} 
              onClose={() => setVisible43(false)} 
              resizable
            />
            <Drawer 
              placement="left"
              visible={visible44} 
              onClose={() => setVisible44(false)} 
              resizable
            />
          </div>

          缓存宽度：宽度调整后再次打开不会恢复为原来的宽度
          <Button type="primary" onClick={() => setVisible2(true)}>Drawer2</Button>
          <Drawer 
            visible={visible2} 
            onClose={() => setVisible2(false)} 
            resizable
            cacheId="2"
          >
            <Button type="primary" onClick={() => setVisible3(true)}>Drawer3</Button>
            <Drawer 
              visible={visible3} 
              onClose={() => setVisible3(false)} 
              resizable
              cacheId="3"
            />
          </Drawer>
          <div style={{ margin: '16px 0' }}>
            通过指定cacheId使不同的实例使用同一个缓存：<br />这俩缓存了一样的宽度&nbsp;
            <Button type="primary" onClick={() => setVisible11(true)}>Drawer1_1</Button>&nbsp;
            <Button type="primary" onClick={() => setVisible12(true)}>Drawer1_2</Button>
            <Drawer 
              visible={visible11} 
              onClose={() => setVisible11(false)} 
              resizable
              cacheId="1"
            />
            <Drawer 
              visible={visible12} 
              onClose={() => setVisible12(false)} 
              resizable
              cacheId="1"
            />
          </div>
          
      </Section>
    </>
  );
};

export default Doc;

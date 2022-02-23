import React from 'react';
import styled from 'styled-components';
import Title from './Title';
import Content from './Content';
import Footer from './Footer';

const Wrap = styled.div`

`;

type DrawerWrapProps = {
  
};

const DrawerWrap: React.FC<DrawerWrapProps> = () => {

  return (
    <Wrap>
      <Title />
      <Content />
      <Footer />
    </Wrap>
  );
};

export default DrawerWrap;

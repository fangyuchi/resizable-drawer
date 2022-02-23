import React from 'react';
import styled from 'styled-components';

const Span = styled.span({
  'a': {
    marginLeft: 8,
    opacity: 0,
    color: '#0670ff',
    transition: 'opacity .3s'
  },

  '&:hover a': {
    opacity: 1
  }
});

export type AnchorType = {
  id?: string;
  children: React.ReactNode;
  titleLevel?: 1 | 2 | 3 | 4 | 5;
};

const Anchor: React.FC<AnchorType> = ({
  id,
  children,
  titleLevel
}) => {

  if (!children) {
    return null;
  }

  return (
    <Span>
      {
        React.createElement(`h${titleLevel}`, null, [
          <span key="span">{children}</span>,
          <a key="a" id={id || children as string} href={`#${id || children}`} className="anchor" >#</a>
        ])
      }
    </Span>
  );
};

Anchor.defaultProps = {
  titleLevel: 2
};

export default Anchor;

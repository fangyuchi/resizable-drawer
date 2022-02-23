import React, { ReactNode } from 'react';
import { Divider } from 'antd';
import Anchor, { AnchorType } from '../Anchor';

type SectionProps = {
  id?: string;
  title: ReactNode;
  titleLevel?: AnchorType['titleLevel'];
  children: ReactNode;
  divider?: boolean;
};

const Section: React.FC<SectionProps> = ({
  id,
  title,
  titleLevel,
  children,
  divider
}) => {

  return (
    <div>
      <Anchor titleLevel={titleLevel} id={id}>{title}</Anchor>
      {children}
      {
        divider ? <Divider /> : null
      }
      
    </div>
  );
};

Section.defaultProps = {
  divider: true
};

export default Section;

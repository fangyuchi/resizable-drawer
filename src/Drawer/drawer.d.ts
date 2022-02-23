import type React from 'react';

export type DrawerProps = {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;

  visible?: boolean;
};

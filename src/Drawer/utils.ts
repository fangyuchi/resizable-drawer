import type { DrawerProps as AntDrawerProps } from 'antd';

export const calcNewSize = (placement: AntDrawerProps['placement'], prev: any, next: any) => {

  switch (placement) {
    case 'top':
      return {
        size: next.clientY - prev.clientY + prev.size,
        attribute: 'height'
      };
    case 'right':
      return {
        size: prev.clientX - next.clientX + prev.size,
        attribute: 'width'
      };
    case 'bottom':
      return {
        size: prev.clientY - next.clientY + prev.size,
        attribute: 'height'
      };
    case 'left':
      return {
        size: next.clientX - prev.clientX + prev.size,
        attribute: 'width'
      };
    default:
      return {};
  }
};

export const getSize = (placement: AntDrawerProps['placement'], element) => {
  switch (placement) {
    case 'top':
    case 'bottom':
      return parseInt(element.style.height);
    case 'right':
    case 'left':
      return parseInt(element.style.width);
    default:
      return 0;
  } 
};

export const isTriggerArea = (placement: AntDrawerProps['placement'], e) => {
  const rect = e.currentTarget.getBoundingClientRect();

  switch (placement) {
    case 'top':
      return (getSize('top', e) - rect.top) <= 2;
    case 'right':
      return e.clientX - rect.left <= 2;
    case 'bottom':
      return e.clientY - rect.top <= 2;

    case 'left':
      return (getSize('left', e) - rect.left) <= 2;

    default:
      return false;
  }
};

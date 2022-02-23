import React from 'react';
import { Drawer as AntDrawer, DrawerProps as AntDrawerProps } from 'antd';
import random from 'random-string';
import classnames from '../utils/classnames';
import { getClassName } from '../utils';
import { calcNewSize, getSize } from './utils';
import './styles.scss';

const cache: Map<string, { size: number } | null> = new Map();

const defaultMinSize = 56;

export type DrawerProps = {
  cacheId?: string;
  resizable?: boolean;
  children?: React.ReactNode;
} & AntDrawerProps;

const Drawer: React.FC<DrawerProps> = ({
  cacheId,
  resizable = false,
  className = '',
  mask = false,
  ...restProps
}) => {
  const {
    visible = false,
    placement = 'right',
  } = restProps;
  const wrapRef = React.useRef<any>(null);
  const drawerRef = React.useRef<HTMLElement>(null);
  const initialRef = React.useRef<any>(null);
  const resizeHolderRef = React.useRef<any>(null);
  const [ drawerId, setDrawerId ] = React.useState('');

  React.useEffect(() => {
    setDrawerId(random());
  }, []);

  const handleMouseMove = React.useCallback((e) => {

    requestAnimationFrame(() => {
      if (drawerRef.current && initialRef.current) {
        const newSize = calcNewSize(placement, initialRef.current, e);

        if (!newSize) {
          return;
        }

        if (newSize.size <= defaultMinSize) {
          return;
        }
        console.log('newSize.size', newSize.size, defaultMinSize)

        drawerRef.current.style[newSize.attribute] = `${newSize.size}px`;
      }
    });
  }, [ placement ]);

  const handleMouseUp = React.useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.removeProperty('cursor');
    document.body.style.removeProperty('user-select');

    if (cacheId) {
      setTimeout(() => {
        cache.set(cacheId, { size: parseInt(drawerRef.current.style.width) });
      }, 0)
    }
  }, [ handleMouseMove, cacheId ]);

  const handleMouseDown = React.useCallback((e) => {
    // if (e.currentTarget !== drawerRef.current) {
    //   return;
    // }

    // 点击发生在边缘时才响应
    // if (isTriggerArea(placement, e)) {
    initialRef.current = {
      size: getSize(placement, drawerRef.current),
      clientX: e.clientX,
      clientY: e.clientY
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    e.stopPropagation();
    // }
  }, [ placement, handleMouseMove, handleMouseUp ]);

  React.useEffect(() => {
    if (visible && resizable) {
      const wrap = document.querySelector(`.${getClassName(`drawer-${drawerId}`)}`);
      if (!wrap) {
        return null;
      }

      wrapRef.current = wrap;

      const contentWrapper =  wrap.querySelector(`.ant-drawer-content-wrapper`);
      const contentNode: HTMLElement = mask ? contentWrapper : wrap as any;

      if (!resizeHolderRef.current) {
        const resizeHolder: HTMLDivElement = document.createElement('div');
        resizeHolder.classList.add(getClassName(`drawer-resize-holder-${placement}`));
        resizeHolder.innerHTML = (placement === 'left' || placement === 'right') ? '<span></span>' : '<span></span>';
  
        contentWrapper.appendChild(resizeHolder);

        resizeHolderRef.current = resizeHolder;
      }

      resizeHolderRef.current.addEventListener('mousedown', handleMouseDown);

      drawerRef.current = contentNode;

      const tarCache = cache.get(cacheId);

      if (tarCache?.size) {
        if (placement === 'left' || placement === 'right') {
          const innerWidth = window.innerWidth - 20;
          contentNode.style.width = `${Math.min(tarCache.size, innerWidth)}px`;
        } else {
          const innerHeight = window.innerHeight - 20;
          contentNode.style.height = `${Math.min(tarCache.size, innerHeight)}px`;
        }
      }

      return () => {
        resizeHolderRef.current.removeEventListener('mousedown', handleMouseDown);
      };
    } else if (resizeHolderRef.current) {
      resizeHolderRef.current.removeEventListener('mousedown', handleMouseDown);
    }

    return null;
  }, [ placement, drawerId, mask, visible, cacheId, resizable, handleMouseDown ]);

  return (
    // <div className={classnames(CompDocument.spliceClassSelector('drawer-wrap'))} ref={wrapRef}>
    <AntDrawer 
      {...restProps}
      mask={mask}
      // getContainer={false}
      className={
        classnames(
          getClassName('drawer'), 
          getClassName(`drawer-${drawerId}`),
          getClassName(`drawer-${placement}`),
          {
            [getClassName('drawer-resizable')]: resizable
          }, className)
      }
    />
    // </div>
  );
};

export default React.memo(Drawer);

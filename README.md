# resizable-drawer
a resizable ant design drawer component

* 一个可以拖动调整尺寸的Drawer组件
* 基于ant design Drawer组件实现
* 调整后的尺寸会自动缓存，关闭组件后再次打开，会保持前一次调整的尺寸
  
## API

| 参数 | 类型 | 说明 | 默认值 |
|--|--|--|--|
| resizable | boolean | 是否支持调整尺寸 | false |
| cacheId | string | 如果希望多个Drawer缓存同一个尺寸，可以传入相同的id | |

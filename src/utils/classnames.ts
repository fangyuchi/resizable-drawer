
/**
 * 将传入的参数拼成classnames 
 * 支持字符串或者对象
 * 
 * input:
 *   classnames(
 *     'class-1', 
 *     {
 *       'class-2': false,
 *       'class-3': true
 *     }
 *   )
 * 
 * output:
 *   'class-1 class-3'
 * 
 * @param {*} params 
 */
const classnames = (...params: any[]) => {

  if (params.length === 0) {
    return '';
  }

  const names = params.reduce((res, curParam) => {
    if (!curParam) {
      return res;
    }

    let curRes = '';
    if (typeof curParam === 'string') {
      curRes = curParam;
    } else {
      const keys = Object.keys(curParam);

      curRes = keys.reduce((acc, curKey) => {
        const curClass = curParam[curKey] ? curKey : null;
  
        return curClass ? `${acc} ${curClass}` : acc;
      }, '');
    }

    return `${res} ${curRes.trim()}`;
  }, '');
  
  return names.trim();
};

export default classnames;


export const getClassName = (selector) => {
  return `rsDrawer--${selector}`;
};

/**
 * input:
 *    (
 *      { user: { name: 'fyc' } },
 *      'user.name'
 *    )
 * 
 * output: 
 *    'fyc'
 * @param fieldKey 
 */
export const getField = (obj: any, fieldKey: string) => {

  if (!obj || (typeof(fieldKey) !== 'string')) {
    return null;
  }

  const keys = fieldKey.split('.');

  const keyLength = keys.length;
  let res = obj;
  let i = 0;

  while (res && (i < keyLength)) {
    res = res[keys[i]];
    i += 1;
  }

  return res;
};

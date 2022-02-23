import React from 'react';

type TextHtmlProps = {
  text: string;
}

/** 
 * 用于 一些特定的字符不能直接显示为文本，需要转义的场合
 * @param param0 
 */
const TextHtml: React.FC<TextHtmlProps> = ({
  text
}) => {

  return <>{text}</>;
};

export default TextHtml;

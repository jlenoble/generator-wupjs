const equiv = (text: string): string => {
  let txt = text;

  txt = txt.replace(/"\^\d+\.\d+\.\d+(?:-\d+)?"/g, '"^1.2.3"');

  return txt;
};

export default equiv;

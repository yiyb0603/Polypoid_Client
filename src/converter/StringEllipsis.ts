const stringEllipsis = (text: string, showLength: number) => {
  return text.length > showLength ? text.substring(0, showLength) : text;
};

export default stringEllipsis;
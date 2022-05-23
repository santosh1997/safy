const isValidLink = (link: string): boolean => {
  let isValid = true;
  try {
    const linkURL = new URL(link);
    if (linkURL.protocol !== "http:" && linkURL.protocol !== "https:")
      isValid = false;
  } catch (err) {
    isValid = false;
  }
  return isValid;
};

export default isValidLink;

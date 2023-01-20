
const journalSample = body => {
  const breakpoint = body.indexOf(' ', 50);
  return breakpoint === -1 ? body : `${body.substring(0, breakpoint)}...`;
}

export { journalSample };

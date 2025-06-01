export function cls(...clasName: string[]) {
  return clasName.join(" ");
}

export function setCollapse(content: string, limit: number) {
  if (content.length > limit) {
    return content.substring(0, limit) + "...";
  } else {
    return content;
  }
}

const randomByte = () => Math.round(Math.random()*256);

 export const isPrivate = (ip) => {
  return /^10\.|^192\.168\.|^172\.16\.|^172\.17\.|^172\.18\.|^172\.19\.|^172\.20\.|^172\.21\.|^172\.22\.|^172\.23\.|^172\.24\.|^172\.25\.|^172\.26\.|^172\.27\.|^172\.28\.|^172\.29\.|^172\.30\.|^172\.31\./.test(ip);
}
  
export const randomIp = () => {
  const ip = randomByte() +'.' +
           randomByte() +'.' +
           randomByte() +'.' +
           randomByte();

    return ip;
}

export const publicIp = () => {
  const ip = randomIp();
  if (!isPrivate(ip)) {
    return ip;
  } else {
    return publicIp();
  }

}

export const privateIp = () => {
  const ip = randomIp();
  if (isPrivate(ip)) {
    return ip;
  } else {
    return privateIp();
  } 
}
const randomByte = () => Math.round(Math.random()*256);

// generates IPs in the range of 0.0.0.0 to 0.255.255.255
const generateCurrentNetworkIP = () => {
  return '0.' + randomByte() + '.' + randomByte() + '.' + randomByte();
}

// generates IPs in the range of 10.0.0.0 to 10.255.255.255
const generate10PrivateNetworkIP = () => {
 return 10 + '.' + randomByte() + '.' + randomByte() + '.' + randomByte();
}

// generates IPs in the range of 100.64.0.0 to 100.127.255.255
const generateSharedAddressSpaceIP = () => {
  return 100 + '.' + (Math.floor(Math.random() * 63) + 64) + '.' + randomByte() + '.' + randomByte();
}

// generates IPs in the range of 127.0.0.0 to 127.255.255.255
const generateLoopBackIP = () => {
  return 127 + '.' + randomByte() + '.' + randomByte() + '.' + randomByte();
}

// generates IPs in the range of 169.254.0.0 to 169.254.255.255
const generateLinkLocalIP = () => {
  return '169.254.' + randomByte() + '.' + randomByte();
}

// generates IPs in the range of 172.16.0.0 to 172.31.255.255
const generate172PrivateNetworkIP = () => {
  return 172 + '.' + (Math.floor(Math.random() * 15) + 16) + '.' + randomByte() + '.' + randomByte();
}

// generates IPs in the range of 192.0.0.0 to 192.0.0.255
const generateIETFProtocolIP = () => {
  return '192.0.0.' + randomByte();
}

// generates IPs in the range of 192.0.2.0 to 192.0.2.255
const generateTestNet1IP = () => {
  return '192.0.2.' + randomByte();
}

// generates IPs in the range of 192.88.99.0 to 192.88.99.255
const generateRelayIP = () => {
  return '192.88.99.' + randomByte();
}

// generates IPs in the range of 192.168.0.0 to 192.168.255.255
const generate192PrivateNetworkIP = () => {
  return '192.168.' + randomByte() + '.' + randomByte();
}

// generates IPs in the range of 198.18.0.0 to 198.19.255.255
const generateBenchmarkingIP = () => {
  return '198.' + (Math.floor(Math.random() * 1) + 18) + '.' + randomByte() + '.' + randomByte();
}

// generates IPs in the range of 198.51.100.0 to 198.51.100.255
const generateTestNet2IP = () => {
  return '198.51.100.' + randomByte();
}

// generates IPs in the range of 203.0.113.0 to 203.0.113.255
const generateTestNet3IP = () => {
  return '203.0.113.' + randomByte();
}

// generates IPs in the range of 224.0.0.0 to 239.255.255.255
const generateMulticastIP = () => {
  return (Math.floor(Math.random() * 15) + 224) + '.' + randomByte() + '.' + randomByte() + '.' + randomByte();
}

// generates IPs in the range of 240.0.0.0 to 255.255.255.254
const generateFutureUseIP = () => {
  return (Math.floor(Math.random() * 15) + 240) + '.' + randomByte() + '.' + randomByte() + '.' + Math.floor(Math.random() * 254);
}

const generateLimitedBroadcastIP = () => '255.255.255.255';

export const isPrivate = (ip) => {
  return /^0\.|^10\.|^100\.(6[4-9]|[7-9][0-9]|1[01][0-9]|12[0-7])\.|^127\.|^169\.254\.|^172\.(1[6-9]|2[0-9]|3[01])\.|^192\.0\.0\.|^192\.0\.2\.|^192\.88\.99\.|^192\.168\.|^198\.(1[89])\.|^198\.51\.100\.|^203\.0\.113\.|^(22[4-9]|23[0-9])\.|^(24[0-9]|25[0-5])\./.test(ip);
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
const privateIPArray = [
  generateCurrentNetworkIP,
  generate10PrivateNetworkIP,
  generateSharedAddressSpaceIP,
  generateLoopBackIP,
  generateLinkLocalIP,
  generate172PrivateNetworkIP,
  generateIETFProtocolIP,
  generateTestNet1IP,
  generateRelayIP,
  generate192PrivateNetworkIP,
  generateBenchmarkingIP,
  generateTestNet2IP,
  generateTestNet3IP,
  generateMulticastIP,
  generateFutureUseIP,
  generateLimitedBroadcastIP,
];

// selects a random private IP generator and calls it
export const privateIp = () => {
  const index = Math.floor(Math.random() * privateIPArray.length);
  const genFunction = privateIPArray[index]
  return genFunction()
}
const randomByte = () => Math.round(Math.random()*256);

// generates IPs in the range of 0.0.0.0 to 0.255.255.255
const generateCurrentNetworkIP = () => {
  const ip = '0.' + randomByte() + '.' + randomByte() + '.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the range for current network addresses`,
  };
}

// generates IPs in the range of 10.0.0.0 to 10.255.255.255
const generate10PrivateNetworkIP = () => {
   const ip = '10.' + randomByte() + '.' + randomByte() + '.' + randomByte();
   return {
     ip,
     public: false,
     errorMessage: `${ip} is within a private network range`,
  }
}

// generates IPs in the range of 100.64.0.0 to 100.127.255.255
const generateSharedAddressSpaceIP = () => {
  const ip = '100.' + (Math.floor(Math.random() * 63) + 64) + '.' + randomByte() + '.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the range for shared address space`,
  }
}

// generates IPs in the range of 127.0.0.0 to 127.255.255.255
const generateLoopBackIP = () => {
  const ip = '127.' + randomByte() + '.' + randomByte() + '.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the range for the loopback addresses`,
  }
}

// generates IPs in the range of 169.254.0.0 to 169.254.255.255
const generateLinkLocalIP = () => {
  const ip = '169.254.' + randomByte() + '.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the range for link local addresses`,
  }
}

// generates IPs in the range of 172.16.0.0 to 172.31.255.255
const generate172PrivateNetworkIP = () => {
  const ip = '172.' + (Math.floor(Math.random() * 15) + 16) + '.' + randomByte() + '.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within a private network range`,
  }
}

// generates IPs in the range of 192.0.0.0 to 192.0.0.255
const generateIETFProtocolIP = () => {
  const ip = '192.0.0.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the range for the IETF protocol addresses`,
  }
}

// generates IPs in the range of 192.0.2.0 to 192.0.2.255
const generateTestNet1IP = () => {
  const ip = '192.0.2.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the TEST-NET-1 range of addresses`,
  }
}

// generates IPs in the range of 192.88.99.0 to 192.88.99.255
const generateRelayIP = () => {
  const ip = '192.88.99.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the range for relay addresses`,
  }
}

// generates IPs in the range of 192.168.0.0 to 192.168.255.255
const generate192PrivateNetworkIP = () => {
  const ip = '192.168.' + randomByte() + '.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within a private network range`,
  }
}

// generates IPs in the range of 198.18.0.0 to 198.19.255.255
const generateBenchmarkingIP = () => {
  const ip = '198.' + (Math.floor(Math.random() * 1) + 18) + '.' + randomByte() + '.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the range for benchmarking addresses`,
    
  }
}

// generates IPs in the range of 198.51.100.0 to 198.51.100.255
const generateTestNet2IP = () => {
  const ip = '198.51.100.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the TEST-NET-2 range of addresses`
  }
}

// generates IPs in the range of 203.0.113.0 to 203.0.113.255
const generateTestNet3IP = () => {
  const ip = '203.0.113.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the TEST-NET-3 range of addresses`,
  }
}

// generates IPs in the range of 224.0.0.0 to 239.255.255.255
const generateMulticastIP = () => {
  const ip = (Math.floor(Math.random() * 15) + 224) + '.' + randomByte() + '.' + randomByte() + '.' + randomByte();
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the multicast address range`,
  }
}

// generates IPs in the range of 240.0.0.0 to 255.255.255.254
const generateFutureUseIP = () => {
  const ip = (Math.floor(Math.random() * 15) + 240) + '.' + randomByte() + '.' + randomByte() + '.' + Math.floor(Math.random() * 254);
  return {
    ip,
    public: false,
    errorMessage: `${ip} is within the range of addresses reserved for future use`,
  }
}

const generateLimitedBroadcastIP = () => {
  const ip = '255.255.255.255';
  return {
    ip,
    public: false,
    errorMessage: `${ip} is the limited broadcast IP`,
  }
}

const isPrivate = (ip) => {
  return /^0\.|^10\.|^100\.(6[4-9]|[7-9][0-9]|1[01][0-9]|12[0-7])\.|^127\.|^169\.254\.|^172\.(1[6-9]|2[0-9]|3[01])\.|^192\.0\.0\.|^192\.0\.2\.|^192\.88\.99\.|^192\.168\.|^198\.(1[89])\.|^198\.51\.100\.|^203\.0\.113\.|^(22[4-9]|23[0-9])\.|^(24[0-9]|25[0-5])\./.test(ip);
}
  
const randomIp = () => {
  const ip = randomByte() +'.' +
           randomByte() +'.' +
           randomByte() +'.' +
           randomByte();
    return ip;
}

export const publicIp = () => {
  const ip = randomIp();
  if (!isPrivate(ip)) {
    return { 
      ip,
      public: true,
      errorMessage: `${ip} is a public IP address`,
    };
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

const publicPrivateList = [
  publicIp,
  privateIp,
];

export const generatePublicOrPrivateIP = () => {
  const selection = Math.floor(Math.random() * publicPrivateList.length);
  const IPFunction = publicPrivateList[selection];
  return IPFunction();
}
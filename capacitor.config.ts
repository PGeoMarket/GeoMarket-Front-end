import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.geomarketsena.miapp',
  appName: 'GeoMarket',
  webDir: 'dist/GeoMarket_Front-end/browser',
  server: {
    "androidScheme": "https"
  }

};

export default config;

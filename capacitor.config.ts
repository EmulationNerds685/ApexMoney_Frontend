import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.apexmoney.app',
  appName: 'ApexMoney',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

if (!projectId) {
  console.warn(
    'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not defined.'
  );
}

export const config = getDefaultConfig({
  appName: 'NexaPay',
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});
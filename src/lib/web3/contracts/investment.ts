import { ethers } from 'ethers';
import { getProvider } from '../utils/provider';

const USDT_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function transfer(address recipient, uint256 amount) external returns (bool)',
  'function balanceOf(address account) external view returns (uint256)'
];

const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'; // BSC USDT
const RECIPIENT_ADDRESS = '0x8959f7079CB5799C91dA5226d1420328574697f5';

export async function invest(amount: string): Promise<string> {
  const provider = getProvider();
  if (!provider) throw new Error('No provider found');

  const signer = new ethers.BrowserProvider(provider).getSigner();
  const usdtContract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, await signer);

  // Convert amount to wei (USDT has 18 decimals)
  const amountWei = ethers.parseUnits(amount, 18);

  // First approve the transfer
  const approveTx = await usdtContract.approve(RECIPIENT_ADDRESS, amountWei);
  await approveTx.wait();

  // Then transfer
  const transferTx = await usdtContract.transfer(RECIPIENT_ADDRESS, amountWei);
  const receipt = await transferTx.wait();

  return receipt.hash;
}
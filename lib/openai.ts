import { AzureOpenAI } from 'openai';

if (!process.env.AZURE_SECRET_KEY) {
  throw new Error('Missing AZURE_SECRET_KEY environment variable');
}

if (!process.env.AZURE_ENDPOINT_URL) {
  throw new Error('Missing AZURE_ENDPOINT_URL environment variable');
}

export const openai = new AzureOpenAI({
  apiKey: process.env.AZURE_SECRET_KEY,
  endpoint: process.env.AZURE_ENDPOINT_URL,
  apiVersion: '2024-10-21',
});
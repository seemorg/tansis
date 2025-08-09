import { AzureOpenAI, OpenAI } from 'openai';

export const createAzureOpenAI = () => {
  if (!process.env.AZURE_SECRET_KEY) {
    throw new Error('Missing AZURE_SECRET_KEY environment variable');
  }

  if (!process.env.AZURE_ENDPOINT_URL) {
    throw new Error('Missing AZURE_ENDPOINT_URL environment variable');
  }

  return new AzureOpenAI({
    apiKey: process.env.AZURE_SECRET_KEY,
    endpoint: process.env.AZURE_ENDPOINT_URL,
    apiVersion: '2024-10-21',
  });
};

export const openai = process.env.AZURE_SECRET_KEY && process.env.AZURE_ENDPOINT_URL 
  ? createAzureOpenAI()
  : null;

export const createDirectOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};
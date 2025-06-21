#!/usr/bin/env node

const API_BASE = process.env.API_BASE || 'http://localhost:3000';

async function testSingleTransliteration(text, style = 'IJMES', reverse = false) {
  try {
    const response = await fetch(`${API_BASE}/api/transliterate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, style, reverse })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error}`);
    }

    const result = await response.json();
    return result.transliteration;
  } catch (error) {
    console.error('Single transliteration failed:', error.message);
    return null;
  }
}

async function testBatchTransliteration(texts, style = 'IJMES', reverse = false) {
  try {
    const response = await fetch(`${API_BASE}/api/transliterate/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texts, style, reverse })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${error.error}`);
    }

    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error('Batch transliteration failed:', error.message);
    return null;
  }
}

async function getApiInfo() {
  try {
    const response = await fetch(`${API_BASE}/api/transliterate`);
    const info = await response.json();
    console.log('API Information:');
    console.log(JSON.stringify(info, null, 2));
  } catch (error) {
    console.error('Failed to get API info:', error.message);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'info') {
    await getApiInfo();
    return;
  }

  if (command === 'single') {
    const text = args[1];
    const style = args[2] || 'IJMES';
    
    if (!text) {
      console.error('Usage: node test-api.js single "Arabic text" [style]');
      process.exit(1);
    }

    console.log(`Transliterating: "${text}" using ${style}`);
    const result = await testSingleTransliteration(text, style);
    
    if (result) {
      console.log(`Result: ${result}`);
    }
    return;
  }

  if (command === 'batch') {
    const texts = args.slice(1);
    
    if (texts.length === 0) {
      console.error('Usage: node test-api.js batch "text1" "text2" ...');
      process.exit(1);
    }

    console.log(`Batch transliterating ${texts.length} texts using IJMES`);
    const results = await testBatchTransliteration(texts, 'IJMES');
    
    if (results) {
      results.forEach((result, index) => {
        console.log(`${index + 1}. "${result.text}" → "${result.transliteration}"`);
      });
    }
    return;
  }

  console.log(`
Arabic Transliteration API Test Script

Usage:
  node test-api.js info                          # Get API documentation
  node test-api.js single "Arabic text" [style] # Single transliteration  
  node test-api.js batch "text1" "text2" ...    # Batch transliteration

Examples:
  node test-api.js info
  node test-api.js single "السلام عليكم" IJMES
  node test-api.js batch "السلام عليكم" "مرحبا" "شكرا"

Environment:
  API_BASE=${API_BASE}
  `);
}

main().catch(console.error);
<div align="center">

![Tansis AI](public/og.png)

# Tansis AI

**Professional Arabic Transliteration Tool**

A modern, AI-powered web application for transliterating Arabic text to Latin script using various academic transliteration standards. Perfect for scholars, researchers, students, and anyone working with Arabic texts.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green)](https://openai.com/)

</div>

## ✨ Features

- **🎯 Multiple Academic Standards**: Support for IJMES, ALA-LC, DIN 31635, Buckwalter, SHARIAsource, and Custom styles
- **🔄 Bidirectional Conversion**: Convert Arabic to Latin script and reverse transliteration
- **⚡ Batch Processing**: Process multiple texts simultaneously via API
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices  
- **🚀 Real-time Processing**: Instant transliteration with smart loading states
- **🛡️ Robust Error Handling**: Comprehensive error handling with automatic retry logic
- **🎨 Modern UI**: Clean, accessible interface built with Radix UI components
- **🔌 API First**: RESTful API with comprehensive documentation

## 🎓 Supported Transliteration Standards

| Standard | Description | Use Case |
|----------|-------------|----------|
| **IJMES** | International Journal of Middle Eastern Studies | Academic publications |
| **ALA-LC** | American Library Association - Library of Congress | Library cataloging |
| **DIN 31635** | German transliteration standard | German academic institutions |
| **Buckwalter** | ASCII-only transliteration system | Digital text processing |
| **SHARIAsource** | Enhanced IJMES with scholarly conventions | Islamic law research |
| **Custom** | Simplified, readable romanization | General readability |

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **UI Components**: Radix UI primitives with custom styling
- **AI Integration**: OpenAI GPT-4 / Azure OpenAI
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **Package Manager**: npm, yarn, pnpm, or bun
- **API Access**: OpenAI API key or Azure OpenAI endpoint

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tansis-ai.git
   cd tansis-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or your preferred package manager
   ```

3. **Set up environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your API credentials:
   ```env
   # For OpenAI API
   OPENAI_API_KEY=your_openai_api_key_here
   
   # OR for Azure OpenAI (if using Azure)
   AZURE_SECRET_KEY=your_azure_secret_key_here
   AZURE_ENDPOINT_URL=https://your-instance.openai.azure.com/
   AZURE_4_1_DEPLOYMENT=your_deployment_name
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 API Documentation

Tansis AI provides a comprehensive RESTful API for programmatic access to transliteration services.

### Base URL
```
https://your-domain.com/api/transliterate
```

### Endpoints

#### **Single Transliteration**
```http
POST /api/transliterate
```

Transliterate a single text string.

**Request Body:**
```json
{
  "text": "السلام عليكم",
  "style": "IJMES",
  "reverse": false
}
```

**Response:**
```json
{
  "transliteration": "al-salām ʿalaykum"
}
```

#### **Batch Transliteration**
```http
POST /api/transliterate/batch
```

Process multiple texts in a single request for better performance.

**Request Body:**
```json
{
  "texts": ["السلام عليكم", "مرحبا"],
  "style": "IJMES",
  "reverse": false
}
```

**Response:**
```json
{
  "results": [
    {
      "text": "السلام عليكم",
      "transliteration": "al-salām ʿalaykum"
    },
    {
      "text": "مرحبا", 
      "transliteration": "marḥaban"
    }
  ]
}
```

#### **API Information**
```http
GET /api/transliterate
```

Returns comprehensive API documentation with available styles, examples, and usage guidelines.

## 📁 Project Structure

```
tansis-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── transliterate/ # Transliteration endpoints
│   ├── [style]/          # Dynamic style-specific pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI primitives (Radix UI)
│   ├── ActionButtons.tsx  # Copy/Clear/Share actions
│   ├── ExamplesSection.tsx # Example texts showcase
│   ├── StyleDropdown.tsx  # Transliteration style selector
│   ├── TextArea.tsx      # Input/output text areas
│   └── TransliteratorCard.tsx # Main transliteration interface
├── lib/                  # Core utilities
│   ├── openai.ts         # OpenAI/Azure OpenAI configuration
│   ├── styles.ts         # Transliteration styles & prompts
│   └── utils.ts          # Helper utilities (cn, etc.)
├── types/                # TypeScript definitions
│   └── transliteration.ts # Type definitions
├── public/               # Static assets
│   ├── og.png           # Open Graph image
│   └── favicon.ico      # Favicon
└── scripts/              # Development scripts
    └── test-api.js      # API testing utilities
```

## 🧪 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build production application |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

### Testing the API

Test the API endpoints using the provided scripts:

```bash
node scripts/test-api.js
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. **Code Style**: Follow existing TypeScript and React conventions
2. **Documentation**: Update documentation for new features
3. **Testing**: Test your changes thoroughly before submitting
4. **Error Handling**: Implement proper error handling
5. **Accessibility**: Ensure UI changes maintain accessibility standards

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

- **Documentation**: Full API documentation available at `/api/transliterate`
- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/your-username/tansis-ai/issues)
- **Discussions**: Join community discussions in [GitHub Discussions](https://github.com/your-username/tansis-ai/discussions)

## 🙏 Acknowledgments

- **OpenAI** for providing the AI capabilities that power the transliteration engine
- **Radix UI** for the accessible component primitives
- **Vercel** for the hosting platform and developer experience
- **Contributors** who help improve this project

---

<div align="center">

Made with ❤️ for the Arabic language research community

**[Live Demo](https://your-demo-url.com)** • **[Documentation](https://your-docs-url.com)** • **[API Reference](https://your-domain.com/api/transliterate)**

</div>
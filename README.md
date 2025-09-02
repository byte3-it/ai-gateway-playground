# AI Gateway Playground

![AI Gateway Playground Demo](docs/demo_screenshot.png)

An open-source playground for [Vercel AI Gateway](https://vercel.com/ai-gateway) that serves as a starting point for creating an AI-ready platform.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbyte3-it%2Fai-gateway-playground&env=AI_GATEWAY_API_KEY&envDescription=Vercel%20AI%20Gateway%20api%20key&envLink=https%3A%2F%2Fvercel.com%2Fdocs%2Fai-gateway%2Fgetting-started%23set-up-your-api-key)

## Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Vercel account with AI Gateway access

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/byte3-it/ai-gateway-playground.git
cd ai-gateway-playground
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_api_key_here
```

**How to get your API key:**

1. Go to [Vercel AI Gateway](https://vercel.com/ai-gateway)
2. Create a new project or select an existing one
3. Generate an API key from the dashboard
4. Copy the key to your `.env` file

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Models

The project comes with some pre-configured AI models. You can view and edit the available models in `src/lib/constants.ts`:

```typescript
export const AVAILABLE_MODELS = [
  {
    id: "openai/gpt-5-nano",
    name: "OpenAI GPT-5 Nano",
  },
  {
    id: "xai/grok-4",
    name: "XAI Grok 4",
  },
  {
    id: "anthropic/claude-3-haiku",
    name: "Anthropic Claude 3 Haiku",
  },
  {
    id: "google/gemini-embedding-001",
    name: "Google Gemini Embedding 001",
  },
];
```

To add more models visit [Vercel AI Gateway Models](https://vercel.com/ai-gateway/models) to see all available models

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: the great [shadcn](https://ui.shadcn.com/) components
- **State Management**: [React Query](https://tanstack.com/query/v5/docs/framework/react/overview) (TanStack Query)
- **AI Integration**: Vercel AI SDK

## 📚 Resources

- [Vercel AI Gateway Documentation](https://vercel.com/docs/ai-gateway)
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/)

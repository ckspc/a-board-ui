# A-Board

A-Board is built with Next.js framework for developing efficient and scalable web applications.

## Features

- 🔐 **Authentication System**
  - Sign-up system
  - Sign-in status tracking
  
## Dependencies (Non-Built-in Next.js Packages)

### State Management
- **Zustand** (^5.0.3)
  - Lightweight state management
  - Simple to use, minimal boilerplate
  - High performance
  - Perfect for small to medium applications

### HTTP Client
- **Axios** (^1.7.9)
  - Promise-based HTTP client
  - Automatic transforms for request and response data
  - Client-side protection from XSRF
  - Progress tracking for uploads and downloads

### UI Components and Icons
- **Lucide React** (^0.474.0)
  - Beautiful and consistent icon set
  - Customizable size and colors
  - Wide variety of icons available
  - Optimized for React

### Loading States
- **React Loader Spinner** (^6.1.6)
  - Various loading animations
  - Customizable colors and sizes
  - Responsive and accessible
  - Easy integration with React components

### Date Management
- **Day.js** (^1.11.13)
  - Modern date utility library
  - Lightweight alternative to Moment.js
  - Chainable operations
  - Extensive plugin system

## Installation

1. Clone repository:
```bash
git clone <repository-url>
cd a-board
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

## Running the Project

### Development Mode
```bash
# Run in development mode
npm run dev
# or
yarn dev
```

### Production Mode
```bash
# Create production build
npm run build
# or
yarn build

# Run production server
npm run start
# or
yarn start
```

## Project Structure

```
src/
├── app/             # Application pages
├── components/      # React components
├── lib/            # Utility functions and configurations
├── store/          # Zustand stores
└── types/          # TypeScript type definitions
```

## Development and Contributing

1. Fork repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

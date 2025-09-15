# Fullstack Academy - Technology-Specific Learning Platform

## Project Overview

Fullstack Academy is a comprehensive educational platform designed to help developers learn and master modern web technologies. Unlike the previous version which used a unified tech stack to teach various technologies, this new architecture allows each module to use the technology stack it teaches, providing an authentic learning experience.

## New Architecture

The platform now follows a micro-architecture approach where each technology module is implemented using its own stack:

### Technology Modules

1. **React Module** (`/modules/react`)
   - Frontend: Pure React application
   - Backend: Node.js/Express API
   - Features: Components, Hooks, Context API examples

2. **Laravel Module** (`/modules/laravel`)
   - Full Laravel application with Blade templates
   - Features: MVC pattern, Eloquent ORM, Middleware

3. **Node.js Module** (`/modules/node`)
   - Frontend: Simple HTML/CSS/JavaScript
   - Backend: Node.js/Express application
   - Features: REST APIs, Express middleware

4. **Tailwind CSS Module** (`/modules/tailwind`)
   - Pure HTML with Tailwind CSS
   - Features: Utility classes, responsive design

5. **SASS Module** (`/modules/sass`)
   - Pure HTML with SASS stylesheets
   - Features: Variables, nesting, mixins

### Gateway (`/gateway`)

A reverse proxy using Nginx routes requests to the appropriate module based on the subdomain:

- `react.fullstackacademy.local` → React module
- `laravel.fullstackacademy.local` → Laravel module
- `node.fullstackacademy.local` → Node.js module
- `tailwind.fullstackacademy.local` → Tailwind CSS module
- `sass.fullstackacademy.local` → SASS module

## Features

### Authentic Learning Experience
Each module uses the technology it teaches, providing hands-on experience with real implementations.

### Independent Development
Modules can be developed, tested, and deployed independently.

### Consistent UI/UX
Shared design system ensures consistent experience across modules.

### Scalability
Each module can be scaled independently based on demand.

## Directory Structure

```
dotNetQuiz/
├── modules/
│   ├── react/
│   │   ├── frontend/
│   │   └── backend/
│   ├── laravel/
│   ├── node/
│   │   ├── frontend/
│   │   └── backend/
│   ├── tailwind/
│   └── sass/
├── gateway/
│   └── nginx/
└── README.md
```

## Setup Instructions

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for development)
- PHP 8.1+ (for Laravel development)
- Composer (for Laravel development)

### Quick Start

1. Clone the repository
2. Add entries to your hosts file:
   ```
   127.0.0.1 react.fullstackacademy.local
   127.0.0.1 laravel.fullstackacademy.local
   127.0.0.1 node.fullstackacademy.local
   127.0.0.1 tailwind.fullstackacademy.local
   127.0.0.1 sass.fullstackacademy.local
   ```

3. Generate SSL certificates (for development):
   ```bash
   cd gateway
   mkdir -p ssl
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout ssl/privkey.pem \
     -out ssl/fullchain.pem \
     -subj "/C=US/ST=State/L=City/O=Organization/CN=fullstackacademy.local"
   ```

4. Start all services:
   ```bash
   docker-compose up -d
   ```

5. Access the modules:
   - React: https://react.fullstackacademy.local
   - Laravel: https://laravel.fullstackacademy.local
   - Node.js: https://node.fullstackacademy.local
   - Tailwind CSS: https://tailwind.fullstackacademy.local
   - SASS: https://sass.fullstackacademy.local

## Module Development

Each module can be developed independently:

### React Module
```bash
cd modules/react/frontend
npm install
npm start
```

### Laravel Module
```bash
cd modules/laravel
composer install
php artisan serve
```

### Node.js Module
```bash
cd modules/node/backend
npm install
npm start
```

### Tailwind CSS Module
```bash
cd modules/tailwind
npm install
npm start
```

### SASS Module
```bash
cd modules/sass
npm install
npm start
```

## Deployment

Each module can be deployed independently to its preferred hosting platform:

- React: Vercel, Netlify, or traditional hosting
- Laravel: Forge, traditional hosting with PHP support
- Node.js: Heroku, AWS, or traditional hosting
- Tailwind CSS: Any static hosting
- SASS: Any static hosting

## Benefits of This Architecture

1. **Real-World Experience**: Students work with actual implementations of each technology
2. **Better Understanding**: Hands-on experience with the tools and frameworks they're learning
3. **Portfolio Building**: Each module can serve as a portfolio piece demonstrating different skills
4. **Independent Scaling**: Each module can be scaled based on demand
5. **Technology Flexibility**: Easy to add new modules with different technology stacks

## Challenges and Solutions

1. **Increased Complexity**: 
   - Solution: Well-documented architecture and clear separation of concerns

2. **Deployment Complexity**: 
   - Solution: Docker containers and automated deployment scripts

3. **Consistency**: 
   - Solution: Shared design system and component libraries

4. **Maintenance**: 
   - Solution: Modular structure makes it easier to maintain individual components

## Future Enhancements

1. **User Authentication**: Single sign-on across all modules
2. **Progress Tracking**: Centralized progress tracking system
3. **Microservices**: Further decomposition of modules into microservices
4. **Advanced Features**: Real-time collaboration, AI-powered learning paths
5. **Mobile Applications**: Native mobile apps for each module

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please open an issue on GitHub.
# Scripts Documentation

This document provides comprehensive information about all available npm scripts in the SocialAI Pro application.

## Available Scripts

### Development Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `dev` | Start development server with hot reloading | `--port`, `--host`, `--open` | `npm run dev` | If port 5173 is busy, use `npm run dev -- --port 3000` |
| `dev:debug` | Start dev server with debugging enabled | `--debug`, `--sourcemap` | `npm run dev:debug` | Check browser dev tools for source maps |

**Detailed Usage:**
```bash
# Basic development server
npm run dev

# Custom port
npm run dev -- --port 3000

# Open browser automatically
npm run dev -- --open

# Bind to all network interfaces
npm run dev -- --host 0.0.0.0

# Development server with custom configuration
npm run dev -- --port 3000 --host 0.0.0.0 --open
```

**Expected Output:**
```
VITE v5.4.1  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

**Common Issues:**
- **Port already in use**: Change port with `--port` flag
- **Network access needed**: Use `--host 0.0.0.0` for external access
- **Slow startup**: Clear Vite cache with `rm -rf node_modules/.vite`

---

### Build Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `build` | Create optimized production build | `--mode`, `--outDir` | `npm run build` | Clear `dist/` folder if build fails |
| `build:dev` | Build with development optimizations | `--mode development` | `npm run build:dev` | Use for staging deployments |
| `build:analyze` | Build with bundle analyzer | `--analyze` | `npm run build:analyze` | View bundle size breakdown |

**Detailed Usage:**
```bash
# Production build
npm run build

# Development build (faster, includes source maps)
npm run build:dev

# Build with custom output directory
npm run build -- --outDir custom-dist

# Build for specific environment
npm run build -- --mode staging
```

**Expected Output:**
```
vite v5.4.1 building for production...
✓ 234 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.30 kB
dist/assets/index-DqBBdfRd.css   12.84 kB │ gzip:  3.28 kB
dist/assets/index-BpuzkrDW.js   142.24 kB │ gzip: 45.73 kB
✓ built in 1.23s
```

**Common Issues:**
- **Out of memory**: Increase Node.js memory with `NODE_OPTIONS="--max-old-space-size=8192"`
- **TypeScript errors**: Run `npx tsc --noEmit` to check types first
- **Missing dependencies**: Ensure all imports are properly installed

---

### Testing Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `test` | Run test suite once | `--coverage`, `--watch` | `npm test` | Install test dependencies if missing |
| `test:watch` | Run tests in watch mode | `--coverage` | `npm run test:watch` | Press 'a' to run all tests |
| `test:coverage` | Run tests with coverage report | `--threshold` | `npm run test:coverage` | Check coverage thresholds in config |
| `test:ui` | Run tests with UI interface | `--port` | `npm run test:ui` | Open browser to view test results |

**Detailed Usage:**
```bash
# Run all tests once
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- PostCreator.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="should render"
```

**Expected Output:**
```
 PASS  src/components/PostCreator.test.tsx
 PASS  src/hooks/use-mobile.test.tsx
 PASS  src/lib/utils.test.ts

Test Suites: 3 passed, 3 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        2.84 s
```

---

### Code Quality Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `lint` | Run ESLint checks on codebase | `--fix`, `--cache` | `npm run lint` | Fix auto-fixable issues with `--fix` |
| `lint:fix` | Run ESLint with auto-fix | `--cache` | `npm run lint:fix` | Manual fixes needed for remaining issues |
| `type-check` | Run TypeScript type checking | `--noEmit` | `npm run type-check` | Check `tsconfig.json` for strict settings |
| `format` | Format code with Prettier | `--write`, `--check` | `npm run format` | Configure `.prettierrc` for custom rules |

**Detailed Usage:**
```bash
# Check for linting errors
npm run lint

# Fix auto-fixable linting issues
npm run lint:fix

# Check specific files
npm run lint -- src/components/

# TypeScript type checking
npm run type-check

# Format all files
npm run format

# Check if files are formatted
npm run format -- --check
```

**Expected Output:**
```bash
# Successful lint
✓ No ESLint warnings or errors

# Lint with issues
src/components/PostCreator.tsx
  45:7  warning  'useState' is defined but never used  @typescript-eslint/no-unused-vars
  52:1  error    Missing semicolon                    semi

✖ 2 problems (1 error, 1 warning)
  1 error and 0 warnings potentially fixable with the --fix option.
```

---

### Preview & Deployment Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `preview` | Preview production build locally | `--port`, `--host` | `npm run preview` | Run `npm run build` first |
| `deploy:staging` | Deploy to staging environment | `--env staging` | `npm run deploy:staging` | Check environment variables |
| `deploy:prod` | Deploy to production | `--env production` | `npm run deploy:prod` | Requires production access |

**Detailed Usage:**
```bash
# Preview production build (requires build first)
npm run build && npm run preview

# Preview on different port
npm run preview -- --port 4000

# Preview with network access
npm run preview -- --host 0.0.0.0
```

---

### Database Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `db:generate` | Generate database types from Supabase | `--project-id` | `npm run db:generate` | Check Supabase connection |
| `db:migrate` | Run database migrations | `--env` | `npm run db:migrate` | Ensure Supabase CLI is installed |
| `db:seed` | Seed database with test data | `--env dev` | `npm run db:seed` | Only run in development |
| `db:reset` | Reset database to initial state | `--confirm` | `npm run db:reset` | **DESTRUCTIVE**: Use with caution |

**Detailed Usage:**
```bash
# Generate TypeScript types from Supabase
npm run db:generate

# Run pending migrations
npm run db:migrate

# Seed development database
npm run db:seed

# Reset database (development only)
npm run db:reset -- --confirm
```

---

### Utility Scripts

| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| `clean` | Clean build artifacts and cache | `--all` | `npm run clean` | Safe to run anytime |
| `analyze` | Analyze bundle size | `--json` | `npm run analyze` | Requires successful build |
| `update-deps` | Update dependencies to latest | `--interactive` | `npm run update-deps` | Test thoroughly after updates |
| `check-updates` | Check for available updates | `--filter` | `npm run check-updates` | Review changes before updating |

**Detailed Usage:**
```bash
# Clean all build artifacts
npm run clean

# Clean and reinstall dependencies
npm run clean -- --all && npm install

# Analyze bundle composition
npm run analyze

# Check for dependency updates
npm run check-updates

# Interactive dependency updates
npm run update-deps -- --interactive
```

---

## Environment-Specific Scripts

### Development Environment
```bash
# Complete development setup
npm run clean
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

### Staging Deployment
```bash
# Staging deployment pipeline
npm run lint
npm run type-check
npm run test
npm run build:dev
npm run deploy:staging
```

### Production Deployment
```bash
# Production deployment pipeline
npm run lint
npm run type-check
npm run test:coverage
npm run build
npm run preview  # Manual verification
npm run deploy:prod
```

## Script Dependencies

### Required Global Tools
```bash
# Install required global dependencies
npm install -g @supabase/cli
npm install -g vercel  # for deployment
npm install -g npm-check-updates  # for dependency management
```

### Optional Development Tools
```bash
# Useful development tools
npm install -g @vitejs/cli
npm install -g typescript
npm install -g eslint
npm install -g prettier
```

## Troubleshooting Common Issues

### Script Execution Problems

**Permission Denied (Unix/macOS)**
```bash
chmod +x scripts/*.sh
npm config set script-shell "/bin/bash"
```

**Windows PowerShell Execution Policy**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Node.js Memory Issues**
```bash
export NODE_OPTIONS="--max-old-space-size=8192"
npm run build
```

### Environment Variable Issues
```bash
# Check if environment variables are loaded
npm run dev -- --debug
# Verify .env file exists and is properly formatted
cat .env.local
```

### Cache-Related Issues
```bash
# Clear various caches
npm run clean
rm -rf node_modules/.cache
rm -rf .next/cache  # if using Next.js features
npm run dev -- --force  # force clear Vite cache
```

### Dependency Conflicts
```bash
# Resolve dependency conflicts
rm -rf node_modules package-lock.json
npm install
# Or use npm ci for clean install
npm ci
```

## Performance Optimization

### Faster Development Builds
```bash
# Use development mode for faster builds
NODE_ENV=development npm run build:dev

# Skip type checking for faster development
SKIP_TYPE_CHECK=true npm run dev
```

### Parallel Script Execution
```bash
# Run multiple scripts in parallel (requires npm-run-all)
npm install --save-dev npm-run-all
npm run build:parallel  # if configured in package.json
```

## Custom Script Configuration

### Adding Custom Scripts
Add to `package.json`:
```json
{
  "scripts": {
    "custom:task": "echo 'Custom task'",
    "build:custom": "vite build --mode custom",
    "test:component": "vitest src/components",
    "deploy:preview": "npm run build && vercel --prod=false"
  }
}
```

This comprehensive scripts documentation ensures that developers can effectively use all available automation tools and troubleshoot common issues during development and deployment.
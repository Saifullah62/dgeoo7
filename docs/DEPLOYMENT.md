# Deployment Guide

## Prerequisites

- Node.js 18+
- npm 9+
- Netlify CLI

## Build Process

1. Install dependencies:
```bash
npm install
```

2. Build application:
```bash
npm run build
```

3. Test build:
```bash
npm run preview
```

## Deployment Steps

### Netlify Deployment

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

### Environment Variables

Required variables:
```env
VITE_TAAL_API_KEY=mainnet_key
```

### Post-Deployment

1. Verify deployment
2. Check blockchain integration
3. Test demo mode
4. Monitor analytics

## Monitoring

- Check error logs
- Monitor transactions
- Track user progression
- Verify reward distribution

## Rollback Procedure

1. Identify issues
2. Revert to previous version
3. Deploy rollback
4. Notify users if needed
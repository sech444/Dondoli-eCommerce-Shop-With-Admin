// lib/logger.ts (or app/lib/logger.ts, depending on your project structure)
import pino from 'pino';

// Initialize Pino logger
const logger = pino({
  // Set the minimum log level based on an environment variable, default to 'info'
  // Use '||' for a fallback value, not '|'
  level: process.env.PINO_LOG_LEVEL || 'info',
  // Use ISO time format for timestamps for better readability and parsing
  timestamp: pino.stdTimeFunctions.isoTime,
  // Configure redaction for sensitive data (example: if you had a 'secretField' in a product object)
  // You can add more paths here for any sensitive data you want to prevent from being logged
  redact: { paths: ['product.secretField'] }, // Add more paths as needed, e.g., 'user.password'
  // Pretty print logs in development for readability, but keep JSON for production
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true, // Enable colorful output in development
    },
  } : undefined, // In production, Pino outputs JSON by default, which is good for log aggregators
});

export default logger;
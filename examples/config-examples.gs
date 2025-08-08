/**
 * Example configuration for Google Sheets Telegram Notifier
 * 
 * Copy this file and modify the CONFIG object in main.gs
 * according to your specific needs.
 */

// Example 1: Basic Configuration
const BASIC_CONFIG = {
  BOT_TOKEN_PROPERTY: 'TELEGRAM_BOT_TOKEN',
  CHAT_ID_PROPERTY: 'TELEGRAM_CHAT_ID',
  MONITORED_RANGES: ['A1:Z100'],
  EXCLUDE_RANGES: [],
  INCLUDE_TIMESTAMP: true,
  INCLUDE_USER_EMAIL: true,
  INCLUDE_OLD_VALUE: true,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  ENABLE_LOGGING: true,
  LOG_LEVEL: 'INFO'
};

// Example 2: Specific Range Monitoring
const SPECIFIC_RANGE_CONFIG = {
  BOT_TOKEN_PROPERTY: 'TELEGRAM_BOT_TOKEN',
  CHAT_ID_PROPERTY: 'TELEGRAM_CHAT_ID',
  MONITORED_RANGES: ['B2:B10', 'D1:F1', 'H5:H20'], // Only monitor specific ranges
  EXCLUDE_RANGES: ['B5'], // Exclude B5 from monitoring
  INCLUDE_TIMESTAMP: true,
  INCLUDE_USER_EMAIL: false, // Don't include user email for privacy
  INCLUDE_OLD_VALUE: true,
  MAX_RETRIES: 5,
  RETRY_DELAY: 2000,
  ENABLE_LOGGING: true,
  LOG_LEVEL: 'DEBUG'
};

// Example 3: High-Security Configuration
const HIGH_SECURITY_CONFIG = {
  BOT_TOKEN_PROPERTY: 'SECURE_BOT_TOKEN',
  CHAT_ID_PROPERTY: 'SECURE_CHAT_ID',
  MONITORED_RANGES: ['A1:A1'], // Monitor only one critical cell
  EXCLUDE_RANGES: [],
  INCLUDE_TIMESTAMP: true,
  INCLUDE_USER_EMAIL: true,
  INCLUDE_OLD_VALUE: false, // Don't include old values for security
  MAX_RETRIES: 1,
  RETRY_DELAY: 500,
  ENABLE_LOGGING: false, // Disable logging for security
  LOG_LEVEL: 'ERROR'
};

// Example 4: Development Configuration
const DEVELOPMENT_CONFIG = {
  BOT_TOKEN_PROPERTY: 'DEV_TELEGRAM_BOT_TOKEN',
  CHAT_ID_PROPERTY: 'DEV_TELEGRAM_CHAT_ID',
  MONITORED_RANGES: ['A1:Z100'],
  EXCLUDE_RANGES: [],
  INCLUDE_TIMESTAMP: true,
  INCLUDE_USER_EMAIL: true,
  INCLUDE_OLD_VALUE: true,
  MAX_RETRIES: 1, // Fail fast in development
  RETRY_DELAY: 100,
  ENABLE_LOGGING: true,
  LOG_LEVEL: 'DEBUG' // Verbose logging for development
};
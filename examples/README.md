# Configuration Examples

This directory contains example configurations for different use cases of the Google Sheets Telegram Notifier.

## Files

- `config-examples.gs` - Various configuration examples for different scenarios
- `setup-guide.md` - Step-by-step setup guide with screenshots
- `telegram-bot-setup.md` - Detailed guide for creating and configuring a Telegram bot

## Configuration Examples

### Basic Configuration
For simple use cases where you want to monitor all changes in a sheet.

### Specific Range Monitoring
For scenarios where you only want to monitor specific cells or ranges.

### High-Security Configuration
For sensitive spreadsheets where minimal information should be logged or transmitted.

### Development Configuration
For testing and development purposes with verbose logging.

## How to Use

1. Choose the configuration that best matches your use case
2. Copy the relevant configuration object
3. Replace the `CONFIG` object in `main.gs` with your chosen configuration
4. Modify the values as needed for your specific requirements
5. Run the setup process as described in the main README

## Security Considerations

- Always use PropertiesService to store sensitive information like bot tokens
- Consider using different chat IDs for different environments (dev, staging, prod)
- Be mindful of what information you include in notifications (user emails, old values)
- Use appropriate logging levels to avoid exposing sensitive data in logs
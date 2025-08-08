# Google Sheets Telegram Notifier

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://script.google.com/)
[![Telegram Bot API](https://img.shields.io/badge/Telegram%20Bot%20API-26A5E4?logo=telegram&logoColor=white)](https://core.telegram.org/bots/api)

A robust Google Apps Script that sends real-time notifications to Telegram whenever cells in your Google Sheets are edited. Perfect for monitoring critical spreadsheets, tracking team updates, and staying informed about important data changes.

## ✨ Features

### 🔄 Real-time Notifications
- Instant Telegram messages when cells are edited
- Customizable message formatting with timestamps
- Support for multiple notification channels

### 🎯 Smart Monitoring
- **Selective Range Monitoring**: Choose specific ranges to watch
- **Exclude Sensitive Areas**: Skip certain ranges from notifications
- **Multi-sheet Support**: Monitor multiple sheets in one spreadsheet

### 🛡️ Robust & Secure
- **Retry Logic**: Automatic retry for failed notifications
- **Error Handling**: Comprehensive error logging and recovery
- **Secure Storage**: Safe credential management with PropertiesService
- **Rate Limiting**: Built-in protection against API limits

### 📊 Rich Message Content
- **Detailed Context**: Spreadsheet name, sheet name, and cell range
- **Value Tracking**: Show both old and new values
- **User Information**: Track who made the changes (optional)
- **Timestamps**: Know exactly when changes occurred

## 📋 Quick Start

### 1. Set Up Telegram Bot
```bash
# 1. Message @BotFather on Telegram
# 2. Create a new bot with /newbot
# 3. Save your bot token and chat ID
```

### 2. Deploy to Google Apps Script
```javascript
// 1. Open Google Apps Script (script.google.com)
// 2. Create new project
// 3. Copy main.gs content
// 4. Run setup() function with your credentials
```

### 3. Configure and Test
```javascript
// Edit CONFIG object for your needs
const CONFIG = {
  MONITORED_RANGES: ['A1:B10', 'D1:F5'],
  INCLUDE_TIMESTAMP: true,
  INCLUDE_USER_EMAIL: true,
  // ... more options
};
```

## 📖 Detailed Setup

For complete setup instructions, see our guides:
- 📚 **[Setup Guide](examples/setup-guide.md)** - Step-by-step installation
- 🤖 **[Telegram Bot Setup](examples/telegram-bot-setup.md)** - Bot creation and configuration
- ⚙️ **[Configuration Examples](examples/config-examples.gs)** - Various configuration scenarios

## 🚀 Usage Examples

### Basic Monitoring
Monitor all changes in a specific range:
```javascript
const CONFIG = {
  MONITORED_RANGES: ['A1:Z100'],
  INCLUDE_TIMESTAMP: true,
  INCLUDE_USER_EMAIL: true
};
```

### Selective Monitoring
Watch specific ranges while excluding others:
```javascript
const CONFIG = {
  MONITORED_RANGES: ['B2:B10', 'D1:F1'], // Important cells only
  EXCLUDE_RANGES: ['B5'],                // Skip B5
  INCLUDE_OLD_VALUE: true
};
```

### Multi-sheet Monitoring
Monitor multiple sheets in one spreadsheet:
```javascript
const CONFIG = {
  MONITORED_RANGES: [
    'Sheet1!A1:B10',
    'Data!C1:D20',
    'Summary!A:A'
  ]
};
```

## 📱 Sample Notification

```
📊 Google Sheets Update

📋 Spreadsheet: Sales Dashboard
📄 Sheet: Q4 Data
📍 Range: B5
✏️ New Value: 1,250
🔄 Previous Value: 1,100
👤 Editor: john.doe@company.com
⏰ Time: 12/15/2024, 2:30:15 PM
```

## 🔧 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `MONITORED_RANGES` | string[] | `['A1:Z100']` | Ranges to monitor for changes |
| `EXCLUDE_RANGES` | string[] | `[]` | Ranges to exclude from monitoring |
| `INCLUDE_TIMESTAMP` | boolean | `true` | Include edit timestamp |
| `INCLUDE_USER_EMAIL` | boolean | `true` | Include editor's email |
| `INCLUDE_OLD_VALUE` | boolean | `true` | Include previous cell value |
| `MAX_RETRIES` | number | `3` | Maximum retry attempts |
| `RETRY_DELAY` | number | `1000` | Delay between retries (ms) |

See the [API Documentation](docs/api.md) for complete configuration options.

## 🧪 Testing

### Test Your Setup
```javascript
// Run in Apps Script editor
function runTests() {
  // Test notification delivery
  testNotification();
  
  // Test range monitoring
  console.log(shouldMonitorRange('A1')); // Should return true/false
}
```

### Manual Testing Checklist
- [ ] Edit cells in monitored ranges
- [ ] Edit cells in excluded ranges (should not notify)
- [ ] Test with different data types (text, numbers, formulas)
- [ ] Verify message formatting and content
- [ ] Test error scenarios (invalid tokens, network issues)

## 🔒 Security Best Practices

### Credential Management
- ✅ Store bot tokens using PropertiesService
- ✅ Never hard-code credentials in scripts
- ✅ Use different tokens for dev/prod environments
- ✅ Regularly rotate bot tokens

### Access Control
- ✅ Limit Google Sheets edit permissions
- ✅ Use view-only sharing when possible
- ✅ Monitor user access regularly
- ✅ Consider data sensitivity in notifications

### Privacy Considerations
- ✅ Review what data is sent to Telegram
- ✅ Consider excluding user emails in notifications
- ✅ Use appropriate logging levels
- ✅ Comply with your organization's data policies

## 🐛 Troubleshooting

### Common Issues

**No notifications received?**
- Check trigger setup: `Triggers` → `Add Trigger` → `onEdit`
- Verify bot token and chat ID in Properties
- Ensure edited cells are in monitored ranges
- Check Apps Script logs for errors

**Telegram API errors?**
- Verify bot token is active and correct
- Check chat ID format (negative for groups)
- Test with manual API calls
- Check for rate limiting

**Permission denied?**
- Re-authorize the script
- Check Google account permissions
- Ensure script has necessary scopes

See the [Setup Guide](examples/setup-guide.md) for detailed troubleshooting steps.

## 📚 Documentation

- 📖 **[API Documentation](docs/api.md)** - Complete function reference
- 🏗️ **[Setup Guide](examples/setup-guide.md)** - Detailed installation steps
- 🤖 **[Telegram Bot Setup](examples/telegram-bot-setup.md)** - Bot configuration
- ⚙️ **[Configuration Examples](examples/)** - Common use cases
- 🤝 **[Contributing Guide](CONTRIBUTING.md)** - Development guidelines

## 🤝 Contributing

We welcome contributions! Whether it's:
- 🐛 Bug fixes
- ✨ New features
- 📖 Documentation improvements
- 💡 Configuration examples

Please read our [Contributing Guide](CONTRIBUTING.md) for details on:
- Development setup
- Coding standards
- Testing guidelines
- Pull request process

## 📊 Project Stats

- **Language**: JavaScript (Google Apps Script)
- **License**: MIT
- **Dependencies**: None (uses built-in Google Apps Script services)
- **Compatibility**: All Google Apps Script runtime versions

## 🗂️ Project Structure

```
google-sheets-telegram-notifier/
├── main.gs                     # Main Google Apps Script code
├── package.json               # Project configuration
├── LICENSE                    # MIT License
├── README.md                  # This file
├── CONTRIBUTING.md           # Contribution guidelines
├── examples/                 # Example configurations and guides
│   ├── config-examples.gs    # Configuration examples
│   ├── setup-guide.md       # Detailed setup instructions
│   └── telegram-bot-setup.md # Telegram bot creation guide
└── docs/                     # Documentation
    └── api.md               # API reference
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Apps Script team for the excellent platform
- Telegram Bot API for reliable messaging
- Contributors who help improve this project

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/bhqmuhammad/google-sheets-telegram-notifier/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/bhqmuhammad/google-sheets-telegram-notifier/issues)
- ❓ **Questions**: [GitHub Discussions](https://github.com/bhqmuhammad/google-sheets-telegram-notifier/discussions)
- 📖 **Documentation**: [Project Wiki](https://github.com/bhqmuhammad/google-sheets-telegram-notifier/wiki)

---

<div align="center">

**[⭐ Star this repository](https://github.com/bhqmuhammad/google-sheets-telegram-notifier)** if you find it useful!

Made with ❤️ for the Google Apps Script community

</div>

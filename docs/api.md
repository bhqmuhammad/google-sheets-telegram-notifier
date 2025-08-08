# API Documentation

This document provides detailed information about the functions and configuration options available in the Google Sheets Telegram Notifier.

## Configuration Object

The `CONFIG` object controls all aspects of the notifier's behavior.

### Properties

#### Bot Configuration
- **`BOT_TOKEN_PROPERTY`** (string): Property key for storing the Telegram bot token
  - Default: `'TELEGRAM_BOT_TOKEN'`
  - Security: Stored securely using PropertiesService

- **`CHAT_ID_PROPERTY`** (string): Property key for storing the Telegram chat ID
  - Default: `'TELEGRAM_CHAT_ID'`
  - Security: Stored securely using PropertiesService

#### Monitoring Configuration
- **`MONITORED_RANGES`** (string[]): Array of ranges to monitor for changes
  - Default: `['A1:Z100']`
  - Format: A1 notation (e.g., 'A1:B10', 'Sheet1!A1:B10')
  - Example: `['A1:B10', 'D1:F5', 'H1:H100']`

- **`EXCLUDE_RANGES`** (string[]): Array of ranges to exclude from monitoring
  - Default: `[]`
  - Format: A1 notation
  - Use case: Exclude sensitive or frequently changing cells

#### Message Configuration
- **`INCLUDE_TIMESTAMP`** (boolean): Include timestamp in notifications
  - Default: `true`
  - Format: Locale-specific date and time string

- **`INCLUDE_USER_EMAIL`** (boolean): Include editor's email in notifications
  - Default: `true`
  - Privacy: Consider setting to `false` for privacy-sensitive environments

- **`INCLUDE_OLD_VALUE`** (boolean): Include the previous cell value
  - Default: `true`
  - Security: Consider setting to `false` for sensitive data

#### Error Handling Configuration
- **`MAX_RETRIES`** (number): Maximum number of retry attempts for failed notifications
  - Default: `3`
  - Range: 1-10 recommended

- **`RETRY_DELAY`** (number): Delay between retry attempts in milliseconds
  - Default: `1000`
  - Note: Delay increases with each retry (exponential backoff)

#### Logging Configuration
- **`ENABLE_LOGGING`** (boolean): Enable/disable logging
  - Default: `true`
  - Performance: Disable for high-frequency environments

- **`LOG_LEVEL`** (string): Logging verbosity level
  - Default: `'INFO'`
  - Options: `'DEBUG'`, `'INFO'`, `'WARN'`, `'ERROR'`

## Core Functions

### Main Event Handler

#### `onEdit(e)`
Main function triggered when a cell is edited.

**Parameters:**
- `e` (GoogleAppsScript.Events.SheetsOnEdit): Edit event object

**Event Object Properties:**
- `e.range`: The edited range
- `e.value`: New value (may be undefined for deletions)
- `e.oldValue`: Previous value (may be undefined)

**Flow:**
1. Validates the edit event
2. Checks if the range should be monitored
3. Prepares notification data
4. Sends Telegram notification

### Notification Functions

#### `sendTelegramNotification(data)`
Sends a notification to Telegram with the provided data.

**Parameters:**
- `data` (object): Notification data object

**Data Object Properties:**
- `spreadsheetName` (string): Name of the spreadsheet
- `sheetName` (string): Name of the sheet
- `range` (string): Edited range in A1 notation
- `newValue` (string): New cell value
- `oldValue` (string): Previous cell value
- `user` (string): Editor's email address
- `timestamp` (Date): When the edit occurred

**Returns:** None (throws on error)

#### `formatMessage(data)`
Formats the notification message for Telegram.

**Parameters:**
- `data` (object): Same as `sendTelegramNotification`

**Returns:** Formatted message string with Telegram MarkdownV2 formatting

**Message Format:**
```
📊 *Google Sheets Update*

📋 **Spreadsheet:** [Spreadsheet Name]
📄 **Sheet:** [Sheet Name]
📍 **Range:** `[A1 Notation]`
✏️ **New Value:** [New Value]
🔄 **Previous Value:** [Old Value] (if enabled)
👤 **Editor:** [User Email] (if enabled)
⏰ **Time:** [Timestamp] (if enabled)
```

#### `escapeMarkdown(text)`
Escapes special characters for Telegram MarkdownV2 formatting.

**Parameters:**
- `text` (string): Text to escape

**Returns:** Escaped text string

**Escaped Characters:**
`*`, `_`, `[`, `]`, `(`, `)`, `~`, `` ` ``, `>`, `#`, `+`, `-`, `=`, `|`, `{`, `}`, `.`, `!`

### Utility Functions

#### `sendMessageWithRetry(botToken, chatId, message)`
Sends a message to Telegram with retry logic.

**Parameters:**
- `botToken` (string): Telegram bot token
- `chatId` (string): Telegram chat ID
- `message` (string): Message to send

**Returns:** Boolean indicating success

**Retry Logic:**
- Exponential backoff (delay increases with each attempt)
- Maximum attempts defined by `CONFIG.MAX_RETRIES`
- Base delay defined by `CONFIG.RETRY_DELAY`

#### `shouldMonitorRange(range)`
Determines if a range should be monitored for changes.

**Parameters:**
- `range` (GoogleAppsScript.Spreadsheet.Range): The edited range

**Returns:** Boolean indicating if range should be monitored

**Logic:**
1. Check if range is in `EXCLUDE_RANGES` (returns false)
2. Check if range is in `MONITORED_RANGES` (returns true)
3. Default: false

#### `isRangeInRange(range1, range2)`
Checks if one range is within another range.

**Parameters:**
- `range1` (string): First range in A1 notation
- `range2` (string): Second range in A1 notation

**Returns:** Boolean indicating if range1 is within range2

**Note:** Current implementation is simplified; can be enhanced for complex range comparisons.

### Property Management

#### `getProperty(key)`
Retrieves a property from PropertiesService.

**Parameters:**
- `key` (string): Property key

**Returns:** Property value (string) or null if not found

**Error Handling:** Logs errors and returns null on failure

#### `setProperty(key, value)`
Sets a property in PropertiesService.

**Parameters:**
- `key` (string): Property key
- `value` (string): Property value

**Returns:** None (throws on error)

**Security:** All sensitive data should be stored using this function

### Setup Functions

#### `setup()`
Initial setup function to configure bot token and chat ID.

**Parameters:** None

**Usage:**
1. Edit the function to include your bot token and chat ID
2. Run the function once to store the credentials
3. Delete or comment out the credentials from the code

**Security Note:** Remove credentials from code after running setup

#### `testNotification()`
Sends a test notification to verify the setup.

**Parameters:** None

**Test Data:**
- Predefined test values for all notification fields
- Helps verify Telegram connectivity and message formatting

#### `createTrigger()`
Creates the onEdit trigger programmatically.

**Parameters:** None

**Actions:**
1. Deletes existing onEdit triggers
2. Creates a new onEdit trigger for the `onEdit` function

**Alternative:** Manual trigger creation through Apps Script UI

### Error Handling

#### `handleError(error)`
Centralized error handling function.

**Parameters:**
- `error` (Error): Error object

**Current Implementation:**
- Logs the error message
- Can be extended to send error notifications

**Extension Ideas:**
- Send error notifications to a different chat
- Email administrators about critical errors
- Implement error rate limiting

## Range Notation

### A1 Notation Examples
- `A1`: Single cell
- `A1:B10`: Rectangle from A1 to B10
- `A:A`: Entire column A
- `1:1`: Entire row 1
- `Sheet1!A1:B10`: Range on specific sheet

### Multi-Sheet Support
To monitor multiple sheets, include sheet names in ranges:
```javascript
MONITORED_RANGES: [
  'Sheet1!A1:B10',
  'Sheet2!C1:D20',
  'Data!A:A'
]
```

## Error Codes and Troubleshooting

### Common Error Messages

#### "Telegram bot token or chat ID not configured"
- **Cause:** Properties not set or setup() not run
- **Solution:** Run setup() function with valid credentials

#### "Telegram API error: [description]"
- **Cause:** Invalid bot token, chat ID, or API rate limiting
- **Solution:** Verify credentials and check Telegram API status

#### "Invalid edit event"
- **Cause:** Malformed edit event object
- **Solution:** Check trigger configuration and event handling

### Debug Mode

Enable debug logging by setting:
```javascript
CONFIG.LOG_LEVEL = 'DEBUG'
```

This will provide verbose logging for troubleshooting.

## Performance Considerations

### Trigger Frequency
- Each cell edit triggers the function
- Large ranges may result in frequent notifications
- Consider using specific ranges rather than entire sheets

### API Rate Limits
- Telegram Bot API has rate limits
- Implement appropriate delays between messages
- Use retry logic for handling temporary failures

### Memory Usage
- Google Apps Script has execution time limits
- Keep message formatting efficient
- Avoid processing large datasets in triggers

## Security Best Practices

### Token Management
1. Never hard-code tokens in scripts
2. Use PropertiesService for all sensitive data
3. Regularly rotate bot tokens
4. Use different tokens for different environments

### Access Control
1. Limit edit access to Google Sheets
2. Use view-only sharing when possible
3. Monitor who has access to your sheets
4. Regularly audit user permissions

### Data Privacy
1. Consider what data to include in notifications
2. Be mindful of user email inclusion
3. Avoid sending sensitive data to Telegram
4. Use appropriate logging levels

## Extending the Script

### Adding Custom Fields
To add custom fields to notifications:

1. Modify the notification data object in `onEdit()`
2. Update the `formatMessage()` function
3. Test with `testNotification()`

### Multiple Chat Support
To send notifications to multiple chats:

1. Store multiple chat IDs in properties
2. Modify `sendTelegramNotification()` to loop through chats
3. Consider different notification rules for different chats

### Custom Message Formats
Create different message formats by:

1. Adding a message type parameter
2. Creating multiple formatting functions
3. Selecting format based on range or conditions

### Integration with Other Services
The script can be extended to integrate with:
- Email notifications
- Slack or other messaging platforms
- Database logging
- Custom webhooks

## Version History

### Version 1.0.0
- Initial implementation
- Basic Telegram notifications
- Configurable ranges
- Retry logic
- Error handling
- Comprehensive documentation
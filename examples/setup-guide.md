# Setup Guide

This comprehensive guide will help you set up the Google Sheets Telegram Notifier step by step.

## Prerequisites

- A Google account with access to Google Sheets and Google Apps Script
- A Telegram account
- Basic understanding of Google Sheets

## Step 1: Prepare Your Telegram Bot

Follow the [Telegram Bot Setup Guide](telegram-bot-setup.md) to:
1. Create a Telegram bot with BotFather
2. Get your bot token
3. Get your chat ID
4. Test your bot setup

## Step 2: Set Up Google Apps Script

### 2.1 Create a New Apps Script Project

1. **Open Google Apps Script**
   - Go to [script.google.com](https://script.google.com)
   - Sign in with your Google account

2. **Create a new project**
   - Click "New project"
   - Give your project a meaningful name (e.g., "Sheets Telegram Notifier")

### 2.2 Add the Code

1. **Delete the default code**
   - Remove the default `myFunction()` code

2. **Copy the main script**
   - Copy the entire content of `main.gs` from this repository
   - Paste it into the Apps Script editor

3. **Save the project**
   - Press `Ctrl+S` or click the save icon
   - Your project will be saved automatically

## Step 3: Configure the Script

### 3.1 Set Up Properties

1. **Open the setup function**
   - In the Apps Script editor, find the `setup()` function
   - Replace `YOUR_BOT_TOKEN_HERE` with your actual bot token
   - Replace `YOUR_CHAT_ID_HERE` with your actual chat ID

2. **Run the setup function**
   - Select `setup` from the function dropdown
   - Click the "Run" button (▶️)
   - You may need to authorize the script first

### 3.2 Authorization Process

1. **Grant permissions**
   - When prompted, click "Review permissions"
   - Select your Google account
   - Click "Advanced" if you see a security warning
   - Click "Go to [Project Name] (unsafe)"
   - Click "Allow"

### 3.3 Verify Setup

1. **Check the logs**
   - Click "View" → "Logs" to see if the setup completed successfully
   - You should see "Setup completed successfully!"

2. **Test the notification**
   - Select `testNotification` from the function dropdown
   - Click "Run"
   - Check your Telegram chat for a test message

## Step 4: Connect to Your Google Sheet

### 4.1 Open Your Target Sheet

1. **Open Google Sheets**
   - Navigate to the Google Sheet you want to monitor
   - Make sure you have edit access to the sheet

### 4.2 Add the Script to Your Sheet

1. **Access Apps Script from Sheets**
   - In your Google Sheet, go to "Extensions" → "Apps Script"
   - This will create a new project bound to your sheet

2. **Copy the code**
   - Copy the `main.gs` code again into this new project
   - Run the `setup()` function again with your credentials

## Step 5: Set Up the Trigger

### 5.1 Automatic Trigger Setup

1. **Run the trigger creation function**
   - Select `createTrigger` from the function dropdown
   - Click "Run"
   - This will automatically set up the onEdit trigger

### 5.2 Manual Trigger Setup (Alternative)

1. **Open triggers panel**
   - Click on the "Triggers" icon (⏰) in the left sidebar

2. **Add a new trigger**
   - Click "+ Add Trigger"
   - Configure the trigger:
     - Choose which function to run: `onEdit`
     - Choose which deployment should run: "Head"
     - Select event source: "From spreadsheet"
     - Select event type: "On edit"

3. **Save the trigger**
   - Click "Save"

## Step 6: Test the Complete Setup

### 6.1 Test Edit Detection

1. **Edit a cell**
   - Go to your Google Sheet
   - Edit any cell in the monitored range
   - Save the change

2. **Check for notification**
   - Look for a notification in your Telegram chat
   - The message should include details about the edit

### 6.2 Verify Configuration

1. **Check the ranges**
   - Make sure you're editing cells within the `MONITORED_RANGES`
   - Verify that excluded ranges are working correctly

2. **Test different edit types**
   - Try editing text, numbers, and formulas
   - Test clearing cells
   - Test multiple cell edits

## Step 7: Customize Your Configuration

### 7.1 Modify Monitoring Ranges

Edit the `CONFIG` object in your script:

```javascript
const CONFIG = {
  // Monitor only specific ranges
  MONITORED_RANGES: ['A1:B10', 'D1:F5'],
  
  // Exclude sensitive ranges
  EXCLUDE_RANGES: ['B5:B7'],
  
  // ... other configuration
};
```

### 7.2 Customize Notifications

Modify the `formatMessage()` function to change:
- Message format and style
- Information included in notifications
- Telegram formatting (bold, italic, etc.)

### 7.3 Advanced Settings

Configure additional options:
- Retry logic for failed messages
- Logging levels
- Error handling behavior

## Troubleshooting

### Common Issues

**No notifications received:**
1. Check if the trigger is properly set up
2. Verify your bot token and chat ID
3. Ensure you're editing monitored ranges
4. Check the Apps Script logs for errors

**Authorization errors:**
1. Re-run the authorization process
2. Make sure your Google account has the necessary permissions
3. Try creating a new Apps Script project

**Telegram API errors:**
1. Verify your bot token is correct
2. Check if your bot is still active
3. Ensure the chat ID is valid
4. Test with the manual Telegram API calls

### Getting Help

1. **Check the logs**
   - Always check "View" → "Logs" in Apps Script for error messages

2. **Test individual functions**
   - Run `testNotification()` to test Telegram connectivity
   - Run parts of the setup separately

3. **Verify configuration**
   - Double-check all property values
   - Ensure ranges are in valid A1 notation

## Security Considerations

### 🔐 Protect Sensitive Information
- Never hard-code bot tokens in your script
- Use PropertiesService for all sensitive data
- Regularly rotate your bot tokens

### 🛡️ Limit Access
- Share your Google Sheet only with trusted users
- Consider using view-only access for most users
- Monitor who has edit access

### 📊 Data Privacy
- Be mindful of what data you're sending to Telegram
- Consider excluding sensitive information from notifications
- Use appropriate logging levels

## Best Practices

### Performance
- Monitor only necessary ranges to reduce trigger frequency
- Use efficient range checking logic
- Implement proper error handling

### Maintenance
- Regularly check your bot's functionality
- Update the script when new features are available
- Monitor notification frequency and adjust as needed

### Documentation
- Document your specific configuration choices
- Keep track of which sheets use the notifier
- Maintain a list of authorized users

## Next Steps

Once your setup is working:
1. Explore the configuration examples in the `examples/` directory
2. Consider implementing additional features like error notifications
3. Set up monitoring for multiple sheets if needed
4. Create documentation for your team on how to use the system

For more advanced configurations and examples, check the other files in the `examples/` directory.
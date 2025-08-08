# Telegram Bot Setup Guide

This guide will walk you through creating and configuring a Telegram bot for use with the Google Sheets Telegram Notifier.

## Step 1: Create a Telegram Bot

1. **Start a conversation with BotFather**
   - Open Telegram and search for `@BotFather`
   - Start a conversation by clicking "Start" or sending `/start`

2. **Create a new bot**
   - Send the command `/newbot`
   - Follow the prompts to name your bot
   - Choose a username for your bot (must end with "bot")

3. **Save your bot token**
   - BotFather will provide you with a bot token
   - **Keep this token secure** - it's like a password for your bot
   - Copy and save it somewhere safe

## Step 2: Get Your Chat ID

### Method 1: Using a Group Chat (Recommended)

1. **Create a group chat**
   - Create a new group in Telegram
   - Add your bot to the group
   - Send a test message in the group

2. **Get the chat ID**
   - Open this URL in your browser: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Replace `<YOUR_BOT_TOKEN>` with your actual bot token
   - Look for the `"chat":{"id":` field in the response
   - The chat ID will be a negative number for groups (e.g., `-1001234567890`)

### Method 2: Using Direct Messages

1. **Start a conversation with your bot**
   - Search for your bot username in Telegram
   - Send a message to your bot

2. **Get the chat ID**
   - Use the same URL method as above
   - The chat ID will be a positive number for direct messages

### Method 3: Using @userinfobot

1. **Forward a message**
   - Forward any message from your target chat to `@userinfobot`
   - It will reply with the chat information including the ID

## Step 3: Test Your Setup

1. **Test the bot token**
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMe
   ```
   This should return information about your bot.

2. **Test sending a message**
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage?chat_id=<YOUR_CHAT_ID>&text=Test message
   ```
   This should send a test message to your chat.

## Security Best Practices

### 🔐 Protecting Your Bot Token
- Never share your bot token publicly
- Don't commit it to version control
- Use environment variables or secure storage
- Regenerate the token if compromised

### 🛡️ Group Chat Security
- Make the group private
- Limit who can add members
- Consider using a dedicated notification group
- Remove the bot if no longer needed

### 📱 Permission Management
- Give your bot only necessary permissions
- Regularly audit group members
- Use different bots for different purposes

## Troubleshooting

### Common Issues

**Bot not responding:**
- Check if the bot token is correct
- Ensure the bot is added to the group (for group chats)
- Verify the chat ID is correct

**Permission denied:**
- Make sure the bot has permission to send messages
- Check if the bot was removed from the group
- Verify you're using the correct chat ID

**Rate limiting:**
- Telegram has rate limits for bots
- Implement retry logic with delays
- Consider batching notifications

### Getting Help

If you encounter issues:
1. Check the Telegram Bot API documentation
2. Verify your bot token and chat ID
3. Test with the manual URL methods above
4. Check the Google Apps Script logs for errors

## Advanced Configuration

### Multiple Chats
You can send notifications to multiple chats by:
- Setting up multiple properties for different chat IDs
- Modifying the script to loop through multiple chats
- Using different bots for different purposes

### Custom Commands
You can add commands to your bot by:
- Setting up webhook endpoints
- Adding command handlers in your script
- Using the `/setcommands` command with BotFather

### Message Formatting
Telegram supports various formatting options:
- **Bold text**: `*bold*`
- *Italic text*: `_italic_`
- `Code text`: `` `code` ``
- [Links](URL): `[text](URL)`

Remember to escape special characters when using MarkdownV2 formatting!
/**
 * Google Sheets Telegram Notifier
 * 
 * This Google Apps Script sends automated notifications to a Telegram chat
 * whenever a specific cell in a Google Sheets spreadsheet is edited.
 * 
 * @author bhqmuhammad
 * @version 1.0.0
 */

/**
 * Configuration object for the Telegram notifier
 * Modify these settings according to your needs
 */
const CONFIG = {
  // Telegram Bot Settings
  BOT_TOKEN_PROPERTY: 'TELEGRAM_BOT_TOKEN',
  CHAT_ID_PROPERTY: 'TELEGRAM_CHAT_ID',
  
  // Notification Settings
  MONITORED_RANGES: ['A1:Z100'], // Ranges to monitor for changes
  EXCLUDE_RANGES: [], // Ranges to exclude from monitoring
  
  // Message Settings
  INCLUDE_TIMESTAMP: true,
  INCLUDE_USER_EMAIL: true,
  INCLUDE_OLD_VALUE: true,
  
  // Error Handling
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // milliseconds
  
  // Logging
  ENABLE_LOGGING: true,
  LOG_LEVEL: 'INFO' // DEBUG, INFO, WARN, ERROR
};

/**
 * Main function triggered when a cell is edited
 * This function should be set as an onEdit trigger
 * 
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e - The edit event object
 */
function onEdit(e) {
  try {
    Logger.log('Edit event triggered');
    
    if (!e || !e.range) {
      Logger.log('Invalid edit event');
      return;
    }
    
    const range = e.range;
    const sheet = range.getSheet();
    const spreadsheet = sheet.getParent();
    
    // Check if the edited range should be monitored
    if (!shouldMonitorRange(range)) {
      Logger.log(`Range ${range.getA1Notation()} is not monitored`);
      return;
    }
    
    // Prepare notification data
    const notificationData = {
      spreadsheetName: spreadsheet.getName(),
      sheetName: sheet.getName(),
      range: range.getA1Notation(),
      newValue: e.value || '',
      oldValue: e.oldValue || '',
      user: Session.getActiveUser().getEmail(),
      timestamp: new Date()
    };
    
    // Send notification
    sendTelegramNotification(notificationData);
    
  } catch (error) {
    Logger.error(`Error in onEdit: ${error.message}`);
    handleError(error);
  }
}

/**
 * Sends a notification to Telegram
 * 
 * @param {Object} data - The notification data
 * @param {string} data.spreadsheetName - Name of the spreadsheet
 * @param {string} data.sheetName - Name of the sheet
 * @param {string} data.range - The edited range
 * @param {string} data.newValue - The new value
 * @param {string} data.oldValue - The old value
 * @param {string} data.user - User email
 * @param {Date} data.timestamp - When the edit occurred
 */
function sendTelegramNotification(data) {
  try {
    const botToken = getProperty(CONFIG.BOT_TOKEN_PROPERTY);
    const chatId = getProperty(CONFIG.CHAT_ID_PROPERTY);
    
    if (!botToken || !chatId) {
      throw new Error('Telegram bot token or chat ID not configured');
    }
    
    const message = formatMessage(data);
    const success = sendMessageWithRetry(botToken, chatId, message);
    
    if (success) {
      Logger.log('Telegram notification sent successfully');
    } else {
      throw new Error('Failed to send Telegram notification after retries');
    }
    
  } catch (error) {
    Logger.error(`Error sending Telegram notification: ${error.message}`);
    throw error;
  }
}

/**
 * Formats the notification message
 * 
 * @param {Object} data - The notification data
 * @returns {string} The formatted message
 */
function formatMessage(data) {
  let message = `📊 *Google Sheets Update*\n\n`;
  message += `📋 **Spreadsheet:** ${escapeMarkdown(data.spreadsheetName)}\n`;
  message += `📄 **Sheet:** ${escapeMarkdown(data.sheetName)}\n`;
  message += `📍 **Range:** \`${data.range}\`\n`;
  message += `✏️ **New Value:** ${escapeMarkdown(data.newValue || 'Empty')}\n`;
  
  if (CONFIG.INCLUDE_OLD_VALUE && data.oldValue) {
    message += `🔄 **Previous Value:** ${escapeMarkdown(data.oldValue)}\n`;
  }
  
  if (CONFIG.INCLUDE_USER_EMAIL && data.user) {
    message += `👤 **Editor:** ${escapeMarkdown(data.user)}\n`;
  }
  
  if (CONFIG.INCLUDE_TIMESTAMP) {
    message += `⏰ **Time:** ${data.timestamp.toLocaleString()}\n`;
  }
  
  return message;
}

/**
 * Escapes special characters for Telegram Markdown
 * 
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeMarkdown(text) {
  if (!text) return '';
  return text.toString()
    .replace(/\*/g, '\\*')
    .replace(/_/g, '\\_')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/~/g, '\\~')
    .replace(/`/g, '\\`')
    .replace(/>/g, '\\>')
    .replace(/#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/-/g, '\\-')
    .replace(/=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/!/g, '\\!');
}

/**
 * Sends a message to Telegram with retry logic
 * 
 * @param {string} botToken - Telegram bot token
 * @param {string} chatId - Telegram chat ID
 * @param {string} message - Message to send
 * @returns {boolean} Success status
 */
function sendMessageWithRetry(botToken, chatId, message) {
  for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const payload = {
        chat_id: chatId,
        text: message,
        parse_mode: 'MarkdownV2'
      };
      
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify(payload)
      };
      
      const response = UrlFetchApp.fetch(url, options);
      const responseData = JSON.parse(response.getContentText());
      
      if (responseData.ok) {
        return true;
      } else {
        throw new Error(`Telegram API error: ${responseData.description}`);
      }
      
    } catch (error) {
      Logger.warn(`Attempt ${attempt} failed: ${error.message}`);
      
      if (attempt === CONFIG.MAX_RETRIES) {
        Logger.error(`All ${CONFIG.MAX_RETRIES} attempts failed`);
        return false;
      }
      
      Utilities.sleep(CONFIG.RETRY_DELAY * attempt);
    }
  }
  
  return false;
}

/**
 * Checks if a range should be monitored for changes
 * 
 * @param {GoogleAppsScript.Spreadsheet.Range} range - The edited range
 * @returns {boolean} Whether the range should be monitored
 */
function shouldMonitorRange(range) {
  const a1Notation = range.getA1Notation();
  
  // Check if range is in excluded ranges
  for (const excludeRange of CONFIG.EXCLUDE_RANGES) {
    if (isRangeInRange(a1Notation, excludeRange)) {
      return false;
    }
  }
  
  // Check if range is in monitored ranges
  for (const monitoredRange of CONFIG.MONITORED_RANGES) {
    if (isRangeInRange(a1Notation, monitoredRange)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Checks if a range is within another range
 * 
 * @param {string} range1 - First range in A1 notation
 * @param {string} range2 - Second range in A1 notation
 * @returns {boolean} Whether range1 is within range2
 */
function isRangeInRange(range1, range2) {
  try {
    // Simple implementation - can be enhanced for more complex range checking
    return range2.includes(':') ? true : range1 === range2;
  } catch (error) {
    Logger.warn(`Range comparison error: ${error.message}`);
    return false;
  }
}

/**
 * Gets a property from PropertiesService
 * 
 * @param {string} key - Property key
 * @returns {string|null} Property value
 */
function getProperty(key) {
  try {
    return PropertiesService.getScriptProperties().getProperty(key);
  } catch (error) {
    Logger.error(`Error getting property ${key}: ${error.message}`);
    return null;
  }
}

/**
 * Sets a property in PropertiesService
 * 
 * @param {string} key - Property key
 * @param {string} value - Property value
 */
function setProperty(key, value) {
  try {
    PropertiesService.getScriptProperties().setProperty(key, value);
    Logger.log(`Property ${key} set successfully`);
  } catch (error) {
    Logger.error(`Error setting property ${key}: ${error.message}`);
    throw error;
  }
}

/**
 * Handles errors and optionally sends error notifications
 * 
 * @param {Error} error - The error object
 */
function handleError(error) {
  Logger.error(`Error occurred: ${error.message}`);
  
  // Optionally send error notifications to a different chat or email
  // Implementation depends on requirements
}

/**
 * Setup function to configure the script
 * Run this function once to set up your bot token and chat ID
 */
function setup() {
  Logger.log('Starting setup...');
  
  // You need to set these values manually or modify this function
  // to get them from user input or a configuration sheet
  const botToken = 'YOUR_BOT_TOKEN_HERE';
  const chatId = 'YOUR_CHAT_ID_HERE';
  
  if (botToken === 'YOUR_BOT_TOKEN_HERE' || chatId === 'YOUR_CHAT_ID_HERE') {
    Logger.error('Please set your bot token and chat ID in the setup() function');
    return;
  }
  
  try {
    setProperty(CONFIG.BOT_TOKEN_PROPERTY, botToken);
    setProperty(CONFIG.CHAT_ID_PROPERTY, chatId);
    
    Logger.log('Setup completed successfully!');
    Logger.log('Now you can set up the onEdit trigger.');
    
  } catch (error) {
    Logger.error(`Setup failed: ${error.message}`);
  }
}

/**
 * Test function to verify the setup
 */
function testNotification() {
  try {
    const testData = {
      spreadsheetName: 'Test Spreadsheet',
      sheetName: 'Sheet1',
      range: 'A1',
      newValue: 'Test Value',
      oldValue: 'Old Value',
      user: 'test@example.com',
      timestamp: new Date()
    };
    
    sendTelegramNotification(testData);
    Logger.log('Test notification sent successfully!');
    
  } catch (error) {
    Logger.error(`Test failed: ${error.message}`);
  }
}

/**
 * Function to create the onEdit trigger programmatically
 */
function createTrigger() {
  try {
    // Delete existing triggers first
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'onEdit') {
        ScriptApp.deleteTrigger(trigger);
      }
    });
    
    // Create new trigger
    ScriptApp.newTrigger('onEdit')
      .onEdit()
      .create();
    
    Logger.log('Trigger created successfully!');
    
  } catch (error) {
    Logger.error(`Error creating trigger: ${error.message}`);
  }
}
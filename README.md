# Google Sheets Telegram Notifier

This Google Apps Script project sends automated notifications to a Telegram chat whenever a specific cell in a Google Sheets spreadsheet is edited. It includes customizable messages and error handling, making it ideal for real-time updates and tracking changes in your spreadsheet.

## Features

- **Automated Notifications**: Sends a message to a specified Telegram chat whenever a specific column in the Google Sheets is updated to a specified value.
- **Customizable Messages**: Allows for customization of the notification message, including the title and the inclusion of specific form response data.
- **Hidden Questions**: Excludes sensitive or unnecessary information from the notification, such as personal contact details and specific hidden questions.
- **Error Handling**: Includes error handling for missing settings, missing columns, and Telegram API errors.

## Setup Instructions

1. **Create a Telegram Bot**:
   - Create a new bot using [BotFather](https://core.telegram.org/bots#botfather) on Telegram and obtain the bot API token.
   - Ensure that the bot has been started by the intended recipients to receive messages.

2. **Set Up the Google Sheets**:
   - Create a Google Sheets document with the necessary columns, including the column to watch for changes and "ID Telegram".
   - Add a new sheet named `Telegram Bot Settings` and fill in the following settings:
     - `B5`: Bot API Token
     - `B9`: Form Responses Sheet Name
     - `B11`: Custom Title for the notifications
     - `B13`: Column name to watch for changes (e.g., "Status Input")
     - `B15`: Value that triggers the notification (e.g., "Sudah Input")

3. **Deploy the Google Apps Script**:
   - Open the Script Editor from the Google Sheets and paste the provided script.
   - Save and authorize the script to access the necessary services.
   - Set up a trigger to run the `sendTelegramNotification` function on edit.

## Example Use Case

- **Sales Order Tracking**: Monitor the status of sales orders and notify sales agents via Telegram when their orders have been inputted into the system, providing real-time updates and ensuring prompt follow-up.

# google-sheets-telegram-notifier
This repository contains a Google Apps Script project that automates the process of sending notifications to a Telegram chat whenever a specific cell in a Google Sheets spreadsheet is edited. This is particularly useful for tracking changes and keeping stakeholders informed in real-time.

Features:
Automated Notifications: Sends a message to a specified Telegram chat whenever the "Status Input" column in the Google Sheets is updated to "Sudah Input".
Customizable Messages: Allows for customization of the notification message, including the title and the inclusion of specific form response data.
Hidden Questions: Excludes sensitive or unnecessary information from the notification, such as personal contact details and specific hidden questions.
Error Handling: Includes error handling for missing settings, missing columns, and Telegram API errors.

Setup Instructions:
Create a Telegram Bot:
Create a new bot using the BotFather on Telegram and obtain the bot API token.
Ensure that the bot has been started by the intended recipients to receive messages.

Set Up the Google Sheets:
Create a Google Sheets document and add the necessary columns, including "Status Input" and "ID Telegram".
Fill in the settings in the "Telegram Bot Settings" sheet:
B5: Bot API Token
B9: Form Responses Sheet Name
B11: Custom Title for the notifications

Deploy the Google Apps Script:
Open the Script Editor from the Google Sheets and paste the provided script.
Save and authorize the script to access the necessary services.
Set up a trigger to run the sendTelegramNotification function on edit.

Example Use Case:
Sales Order Tracking: Monitor the status of sales orders and notify sales agents via Telegram when their orders have been inputted into the system, providing real-time updates and ensuring prompt follow-up.

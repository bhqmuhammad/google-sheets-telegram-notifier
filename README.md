# Google Sheets Telegram Notifier

This Google Apps Script project sends automated notifications to a Telegram chat whenever a specific cell in a Google Sheets spreadsheet is edited. It includes customizable messages and error handling. Ideal for real-time updates and tracking changes in your spreadsheet.

## Features
- Real-time notifications to Telegram
- Customizable messages
- Error handling

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/bhqmuhammad/google-sheets-telegram-notifier.git
    cd google-sheets-telegram-notifier
    ```

2. **Set up Google Apps Script:**
    - Open Google Sheets and go to `Extensions` > `Apps Script`.
    - Copy the code from the repository's `main.gs` file and paste it into the Apps Script editor.
    - Save the project.

3. **Configure Telegram Bot:**
    - Create a Telegram bot using [BotFather](https://core.telegram.org/bots#botfather) and obtain the API token.
    - Set the chat ID where you want to receive notifications.

4. **Environment Variables:**
    - Use the `PropertiesService` in Google Apps Script to store sensitive information like the API token and chat ID securely.

5. **Set up Triggers:**
    - In the Apps Script editor, go to `Triggers` > `Add Trigger`.
    - Set up a trigger to run the `notifyTelegram` function on `Edit`.

## Usage

- Edit the specific cell in the Google Sheets spreadsheet to trigger notifications.
- Customize the notification message in the `notifyTelegram` function.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Troubleshooting

- Ensure the Google Apps Script project has necessary permissions.
- Check the Telegram bot token and chat ID are correctly configured.
- Review error messages in the Apps Script editor's logs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

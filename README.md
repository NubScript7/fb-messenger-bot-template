# Facebook Messenger Bot Template 🤖💬

A friendly, ready-to-customize template for building a Facebook Messenger bot that can respond to users, run useful commands, and turn repeat conversations into simple, automated experiences. Whether it is answering frequently asked questions, sharing links, or connecting to custom functions, this project gives you an easy starting point.

## ✨ What It Does

- Receives incoming Messenger messages and routes them to the right command
- Sends quick text responses, links, or interactive bot actions
- Keeps bot settings and credentials separate from command logic
- Makes it easy to add, remove, or update commands as your bot grows

## ⚙️ Configuration

The app configuration files are stored in:

- `src/config/` — bot settings and credentials
- `.env` — environment values used by the app

Add the required Facebook Page, webhook, and app credentials in these locations according to the setup instructions for the project. Keep Facebook tokens, passwords, and other private values out of source control.

> 🔒 Never share or commit real credentials. A `.env` file should contain local secrets, while example values should be documented with safe placeholders.

## 🚀 Getting Started

1. Install the project dependencies.
2. Configure the environment values and Facebook app settings.
3. Start the bot locally or on your chosen server.
4. Expose the local server through a public webhook URL during testing.
5. Connect the bot to a Facebook Page and subscribe it to Messenger events.
6. Send a test message from Messenger and confirm that the bot replies.

Keep the bot running while testing, and check the terminal or server logs if a message does not receive the expected response.

## ➕ Adding Commands

Commands are defined in `src/core/commands/list.ts`.

To add a new command:

1. Open `src/core/commands/list.ts`.
2. Add a new command entry to the command list.
3. Set the exact command text users should send.
4. Choose the bot response or link the command to the function that should run.
5. Save the file and restart the bot if needed.

Use short, unique command names that are easy for users to recognize, such as `help`, `menu`, or `contact`. Avoid names that are too similar, because that can make commands confusing or trigger the wrong response.

## 💡 Creating a Great Experience

- Test every command in a real Messenger conversation.
- Keep replies clear, useful, and easy to read.
- Provide a `help` command so users can discover what the bot can do.
- Add friendly fallback behavior for messages that do not match a command.
- Update the command list whenever the bot gains a new feature.
- Review logs after testing to catch configuration or routing issues early.

Happy building! 🎉 Your bot is ready to become helpful, welcoming, and full of personality.

# Discord Bot Base

This project is a base framework for developing Discord bots using TypeScript. It provides essential features like user locales and a WebSocket server to control the bot, such as starting or stopping it. This base is designed to help other developers quickly get started with their own bots.

## Features

- **Locales**: Multi-language support for users, allowing you to easily add and manage different languages.
- **WebSocket Server**: Control the bot remotely, with features like stopping and starting the bot.
- **Modular Structure**: Organized code structure to easily manage events, commands, and more.

## Installation

1. Clone this repository or download the zip:
    ```bash
    git clone https://github.com/MrBlackReal/discord-base.git
    ```
2. Navigate to the project directory:
    ```bash
    cd discord-base
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Start the bot:
    ```bash
    npm run start
    ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
BOT_TOKEN="your-bot-token"
BOT_ID="your-bot-id"
```

Additional configuration can be added to the .env file as needed.

## Usage
Once the bot is running, you can interact with it through Discord using slash commands as well as through the WebSocket server for remote control.


## Example Slash Commands
/ping - A basic command to check if the bot is online.


## WebSocket Server
You can control the bot through the WebSocket server by sending commands such as "stop" or "start".


## License
This project is licensed under a Creative Commons Attribution License. You are free to modify and distribute this project as long as you give credit to the original author.


## Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an Issue to discuss what you would like to see in the project.


### Happy Coding! 🎉

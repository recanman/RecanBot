# RecanBot

A quick, asynchronous Discord bot that fetches IP addresses of Roblox game servers for specific experiences. (Temporary repo name)

## Installation

Download the zipped folder through GitHub, then extract it.

After that, `cd` to the directory and run the following command to install the dependencies needed:
```bash
npm install
```

## Usage
Getting the bot up and running is an extremely simple process.
First, open the `config.json` file and edit the `cookie`, the `token`, and the `whitelist`.
The cookie is the .ROBLOSECURITY cookie for authenticated API calls. It is recommended that you create a separate account for this.

After that, run the `bot.js` file.

```bash
node bot.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU Affero General Public License v3.0](https://choosealicense.com/licenses/agpl-3.0/)

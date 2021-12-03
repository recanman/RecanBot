# RecanBot
<sub><sup>This repository is no longer maintained.</sup></sub>
A quick, asynchronous Discord bot that fetches IP addresses of Roblox game servers for specific experiences.

[](https://user-images.githubusercontent.com/29310982/140240243-292593e0-34c3-4574-970b-54c0d87fabf4.mp4)

[](https://user-images.githubusercontent.com/29310982/140240247-38dd3f41-ff23-404b-8bd3-6d43f973b531.mp4)

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

The token is the Discord bot token to run the bot.

The whitelist is a list of users allowed to use the bot.

After that, run the `bot.js` file.

```bash
node bot.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)

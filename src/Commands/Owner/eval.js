const Discord = require("discord.js");
const conf = require("../../Settings/Settings.json")
module.exports = {
  conf: {
    aliases: [],
    name: "eval",
    help: "eval <Code>",
    category: "sahip",
    owner: true,
    command: true,
    cooldown: 15,
  },

  run: async (client, message, args) => {
    if (!args[0]) return;
    let code = args.join(" ");

    try {
      var result = clean(await eval(code));
      if (result.includes(client.token))
        return message.channel.send({ content: "amına sapladığım seni."});
        message.channel.send({ content: `\`\`\`js\n${result}\n\`\`\``});
    } catch (e) {
			return message.channel.send({ content: `\`\`\`js\n${e}\n\`\`\`` });
		}
  },
};

function clean(text) {
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 0 });
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));
  return text;


}
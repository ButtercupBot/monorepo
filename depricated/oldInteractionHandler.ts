// class InteractionHandler {
//     runners: Runner[] = [];
//     commands = new Map<string, SlashCommandBuilder[]>();
//     create = async (guildId: string, command: SlashCommandBuilder) => {
//         const commands: SlashCommandBuilder[] = [command];

//         if (this.commands.has(guildId)) {
//             console.log(this.commands.get(guildId));

//             commands.push(this.commands.get(guildId));
//             console.log(commands.length);
//         }

//         this.commands.set(guildId, commands);
//     };
//     register = async () => {
//         console.log(this.commands);
//         if (!client.user) return new Error('Not logged in');
//         for (const command of this.commands) {
//             const guild = Guild.guild.byId(command[0]);
//             if (!guild) throw new Error(`No Guild found: ${command[0]}`);
//             console.log(command[1]);
//             await rest.put(Routes.applicationGuildCommands(client.user.id, command[0]), {
//                 body: [command[1]]
//             });
//         }
//     };
// }

// const handler = new InteractionHandler();
// await handler.create(
//     '912503529338458142',
//     new SlashCommandBuilder()
//         .setName('ping')
//         .setDescription('Replies with Pong!')
// );
// // console.log(handler.commands);
// await handler.create(
//     '912503529338458142',
//     new SlashCommandBuilder()
//         .setName('ping2')
//         .setDescription('Replies with Pong2!')
// );

// await handler.register();

// const tester = new Runner(`self.butter.reply('meow!!!!!');`, interaction).run();
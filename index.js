const {Client, Intents, Collection, clientuser} = require('discord.js');
require('dotenv').config();
const i18n = require('i18n');
const config = require('./config.json');
const client = new Client({ intents: [ Intents.FLAGS.GUILDS]});
const fs = require('fs');

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}
client.once('ready', () =>{
    console.log('Draken listo');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try{
        await command.execute(interaction);
    } catch(e){
        console.error(e);
        return interaction.reply({content: 'Surgio un error al ejecutar el comando.'})
    }
    // const { commandName } = interaction;

    // if (commandName == 'ping'){
    //     await interaction.reply('Pong!')
    // }
})

// client.login(process.env.token);
client.login(config.token);

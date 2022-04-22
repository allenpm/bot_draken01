const fs = require('fs');
const {SlashCommandBuilder} = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {clientId, guildId, token} = require('./config.json');

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     commands.push(command.data.toJSON());
// }
const rest = new REST({ version: '9' }).setToken(token);
async function createSlash(){
    try{
        const commands = [];
        fs.readdirSync('./commands').forEach(async(category) =>{
            const commandFiles = fs.readdirSync(`./commands/${category}`).filter((archivo) => archivo.endsWith('.js'));
            for(const archivo of commandFiles){
                const command = require(`./commands/${category}/${archivo}`)
                commands.push(command.data.toJSON())
            };
        });
        await rest.put(
            // Routes.applicationGuildCommands(clientId, guildId),
            //en el de arriba solo funcionara en un server
            Routes.applicationCommands(clientId), //lo que se agregue sera para cualquier server
        {body: commands});
        console.log('Osaaa funciona')
    } catch (e){
        console.error(e);
    }
}
createSlash();
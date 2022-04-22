const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Devuelve tu avatar o el otro usuario.')
        .addUserOption(options => options.setName('objetivo').setDescription('Usuario cuyo avatar quieras ver.')),
    async run(interaction){
        console.log('interaction');
        const user = interaction.options.getUser('objetivo');
        if(user){
            const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`El avatar de ${user.username} es:`)
            .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
            return interaction.reply({embeds: [embed]})
        } else {
            const embed = new MessageEmbed()
            .setColor(config.defaultSuccessColor)
            .setDescription(`Tu avatar es:`)
            .setImage(interaction.user.displayAvatarURL({dynamic: true, size: 4096}))
            return interaction.reply({embeds: [embed]})
        }
        // return interaction.reply(`El avatar de ${user.username} es: ${user.displayAvatarURL({dynamic: true, size: 4096})}`);
        // return interaction.reply(`Tu avatar es: ${interaction.user.displayAvatarURL({dynamic: true, size: 4096})}`);
        
    }
}
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Devuelve tu avatar o el otro usuario.')
        .addUserOption(options => options.setName('objetivo').setDescription('Usuario cuyo avatar quieras ver.')),
    async execute(interaction){
        console.log('interaction');
        const user = interaction.options.getUser('objetivo');
        if(user) return interaction.reply(`El avatar de ${user.username} es: ${user.displayAvatarURL({dynamic: true, size: 4096})}`);
        return interaction.reply(`Tu avatar es: ${interaction.user.displayAvatarURL({dynamic: true, size: 4096})}`);

    }
}
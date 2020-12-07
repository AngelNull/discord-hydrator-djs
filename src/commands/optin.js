const config = require('../core/config/config.json');
const functions = require('../functions');
module.exports = {
    name: 'optin',
    description: 'Opt a user into the given role',
    aliases: ['in', 'opt-in'],
    args: false,
    usage: '',
    cooldown: 3,
    execute: async (message) => {
        if (config.enabledCommands.optin) {
            let errorOccured = false;
            // Find the configured ping role
            let role = (await message.guild.roles.cache.find((role) => role.id === config.setup.roleID)) || functions.omitError(`The specified role does not appear to exist.`, 1);
            // Check if the member has the role
            if (message.member.roles.cache.has(role.id)) return message.channel.send(`${message.author}! You already have the role.`);
            // Give the member the role
            await message.member.roles.add(role, `You have been given the role \`${role.name}\`.`).catch(() => {
                // If the bot lacks the permissions, send an error
                errorOccured = true;
            });
            if (errorOccured) return message.channel.send(`I was unable to add you to the role, maybe I lack the permissions or the role is managed by an extension.`);
            // Final confirmation message
            return message.channel.send(`Okay, ${message.author}, you have been given the \`${role.name}\` role.`);
        }
    },
};
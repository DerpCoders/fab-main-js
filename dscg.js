//Deploys all slash commands globally on Discord.

const { SlashCommandBuilder, REST, Routes } = require('discord.js');
require('dotenv').config();

const cmdss = [
    new SlashCommandBuilder()
        .setName('instagram')
        .setDescription('Fetches instagram user details.')
        .addStringOption(option => option.setName('username').setDescription('Instagram Username').setRequired(true)),
    new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Sends the leaderboard of the server.')
        .addStringOption(option =>
            option.setName('format')
                .setDescription('Choose leaderboard format')
                .setRequired(true)
                .addChoices(
                    { name: 'Image', value: 'image' },
                    { name: 'Embed', value: 'embed' }
                )
        ),
    new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Shows the rank card of a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to check rank for')
                .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a song from YouTube or Spotify URL.')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('Enter a song title or YouTube/Spotify URL')
                .setRequired(true)
                .setAutocomplete(true)
        ),
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends the full list of bot commands in DM.'),
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns bot latency and API ping.'),
    new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason to ban')
                .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName('levelup')
        .setDescription('Level-up related commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('channel')
                .setDescription('Sets a channel for level-up messages')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setRequired(true)
                        .setDescription('The channel for level-up messages')
                )
        ),
    new SlashCommandBuilder()
        .setName('gis')
        .setDescription('Google Image Search')
        .addStringOption(option =>
            option.setName('query')
                .setRequired(true)
                .setDescription('The query to search for')
        ),
    new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Bulk delete messages')
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(1)
                .setDescription('The amount of messages to delete (max 100)')
        ),
    new SlashCommandBuilder()
        .setName('avatar')
        .setDescription("Get user avatar")
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user whose avatar you want to fetch')
                .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Playlist related commands')
        .addSubcommand(subcommand =>
            subcommand.setName('create')
                .setDescription('Create a playlist')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Playlist name')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName('add')
                .setDescription('Add songs to a playlist')
        )
        .addSubcommand(subcommand =>
            subcommand.setName('view')
                .setDescription('View your playlist')
        ),
    new SlashCommandBuilder()
        .setName('now')
        .setDescription('Shows all info about the currently playing song')
        .addSubcommand(subcommand =>
            subcommand.setName('playing')
                .setDescription('Shows all info about the currently playing song')
        ),
    new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set yourself as AFK with an optional reason.')
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for being AFK (optional)')
                .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName('statistics')
        .setDescription('Shows bot statistics including client and server information.')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands('759762948016177195'),
            { body: cmdss }
        );

        console.log('Successfully deployed application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
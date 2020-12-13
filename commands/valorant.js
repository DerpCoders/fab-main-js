const Discord = require('discord.js');

module.exports = {
    name: 'valorant',
    execute(message, args){

const { API, Regions, Locales, Queue } = require('node-valorant-api');

const APIKey = "RGAPI-2624a698-0022-4c42-8b00-dc423d2ada8b"; // Your API Key

// The third parameter is the Region for the Account API
// choose the one that is the closest to you
const valorant = new API(Regions.NA, APIKey, Regions.AMERICAS); // An API instance for Valorant query

// Example usage of the VAL-CONTENT-V1 API
valorant.ContentV1.getContent(Locales["en-US"]).then(content => {
    message.channel.send(content.characters.map(char => { return char.name })); //print all the character name in en-US
});

// Example usage of the ACCOUNT-V1 and VAL-MATCH-V1 API
// !!! The MatchV1 API requires a Production API Key
valorant.AccountV1.getAccountByRiotID("Fab is insane", "0001").then(account => {
    
    // Get the puuid by RiotID, then fetch all of the player's matches
    valorant.MatchV1.getMatchById(account.puuid).then(matches => {
      message.channel.send(matches); // this should print the account's matches
    })
});

/**
 * Example usage of the VAL-STATUS-V1 API
 * https://developer.riotgames.com/apis#val-status-v1/GET_getPlatformData
 */
valorant.StatusV1.getPlatformData(null).then(data => {
    message.channel.send(data);
});

/**
 * Example usage of the VAL-MATCH-V1 API
 * Queue: "competitive", "unranked", "spikerush"
 * https://developer.riotgames.com/apis#val-status-v1/GET_getPlatformData
 */
valorant.MatchV1.getRecentMatches(Queue.Competitive).then(data => {
    message.channel.send(data);
})
}
}
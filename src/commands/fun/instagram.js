const Discord = require("discord.js")
const { igApi } = require("insta-fetcher")

module.exports = {
    name: "instagram",
    /**
     * @param {Discord.Message} message 
     * @param {string[]} args 
     * @returns 
     */
    async execute(message, args) {
        let cookie = process.env.instacookie
        let ig = new igApi(cookie);
        let toFetch = args[0];
        if (!toFetch) return message.channel.send({ content: ":warning: **Please provide username!**" })
        try {
            const res = await ig.fetchUser(toFetch);
            console.log(`User requested - ${res.username}`)
            let acctype;
            let fname;
            let ffname;
            let bio;
            let exturl;
            let threadsurl;
            if (res.user.threads_profile_glyph_url) {
                threadsurl = `[Click Here](${res.user.threads_profile_glyph_url})`;
            } else {
                threadsurl = "N/A"
            }
            if (res.is_private) {
                acctype = 'Private'
            } else {
                acctype = "Public"
            }
            if (res.fullname) {
                fname = res.fullname;
                ffname = res.fullname;
            } else {
                fname = "N/A"
                ffname = res.username
            }
            if (res.biography) {
                bio = res.biography;
            } else {
                bio = "N/A"
            }
            if (res.external_url) {
                exturl = res.external_url;
            } else {
                exturl = 'N/A'
            }
            const ebed = new Discord.EmbedBuilder()
                .setTitle(ffname)
                .setAuthor({ name: "Instagram User Fetcher", iconURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" })
                .setColor("#eb3474")
                .setFooter({ text: `ID: ${res.id}` })
                .setThumbnail(res.hd_profile_pic_url_info.url)
                .addFields(
                    { name: "Username:", value: res.username, inline: true },
                    { name: "Full name:", value: fname, inline: true },
                    { name: "Account Type:", value: acctype, inline: true },
                    { name: "Bio:", value: bio, inline: true },
                    { name: "Followers:", value: res.followers.toString(), inline: true },
                    { name: "Following:", value: res.following.toString(), inline: true },
                    { name: "PFP URL (HD):", value: `[Click Here](${res.hd_profile_pic_url_info.url})`, inline: true },
                    { name: "Threads Profile:", value: threadsurl, inline: true },
                    { name: "External URL:", value: exturl, inline: true }
                )
            message.channel.send({ embeds: [ebed] })
        } catch (err) {
            return message.channel.send({ content: "<:disagree:1021025405953654804> **User not found!**" });
        }
    }
}
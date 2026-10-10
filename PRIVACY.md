# Fab – Privacy Policy

**Last updated: 10 October 2026**

This Privacy Policy explains what data the Discord bot **Fab** (Discord application ID `759762948016177195`, "the bot", "we") collects, why it is collected, how long it is kept, and how you can have it removed. Fab is an open-source, non-commercial hobby project. Its source code is public at https://github.com/Fab-is-insane/Fab.

By adding Fab to a Discord server or using its commands you agree to this policy. Server administrators are responsible for informing their members that Fab is present in the server.

## 1. Who operates Fab

Fab is developed and operated by a single individual (Discord username `papaemeritus.4`). The bot runs on a privately owned server. You can reach the operator in the support server: https://discord.gg/ErYkePGWPS.

## 2. Data we store

Fab only stores the data needed for the features a server or user has turned on. All stored data lives in a MongoDB database controlled by the operator. We never sell data or share it with advertisers.

### 2.1 Server configuration (stored per server)

Stored when a server administrator uses a settings command such as `setprefix`, `setlogs`, `set-welcome`, `setlevelup`, `disablecmd`, `createStats` or `daily-news`:

- Server ID and server name
- Custom command prefix
- IDs of the configured log channel, welcome channel, level-up channel, stats category and daily-news channel, plus the chosen timezone for daily news
- The list of commands disabled in the server
- The ID of the administrator who changed a setting (for accountability)

This data is kept until the setting is disabled or the bot is removed from the server.

### 2.2 Leveling data

If leveling is enabled (it is on by default and can be turned off with `disablelevels`), Fab stores, per server:

- Your user ID, your current XP and level

Only the fact that you sent a message is used to award XP. The text of your messages is **not** stored for leveling.

### 2.3 Moderation data

When a server moderator uses `warn`, `mute`, or related commands, Fab stores:

- Server ID, your user ID and username, the moderator's user ID and username
- The reason given by the moderator and the time
- For mutes: the expiry time, so the mute can be lifted automatically

Warnings are kept until a moderator clears them with `clearwarns`. Mute records are deleted when the mute expires or is lifted.

### 2.4 AFK status

When you run `afk`, Fab stores your user ID, server ID, the reason you typed and the time. This is deleted automatically the next time you send a message or react in that server.

### 2.5 Music playlists

When you use `createplaylist` and `addtoplaylist`, Fab stores your user ID and the playlist names and song titles/URLs you add. This is kept until you remove it.

### 2.6 AI chatbot sessions

The `chatbot` command creates a private channel that only you and the bot can see. For this feature:

- Messages you send in that channel are forwarded to **OpenAI** (https://openai.com/policies/privacy-policy) to generate replies. OpenAI's terms govern how they handle that content.
- When the session ends, a transcript of the conversation (your user ID, your messages and the bot's replies, plus an auto-generated title) is saved so you can view it with `chatlogs`. **Transcripts are deleted automatically after 10 days.**
- Any files you attach in the chatbot channel are copied to a private storage channel in the operator's Discord server so that the link remains reachable for the transcript. Do not upload sensitive files to the chatbot channel.

Nobody else in your server can see your chatbot channel or your transcripts.

### 2.7 Data held temporarily in memory only

The following is kept in the bot's memory only, never written to the database, and is lost when the bot restarts:

- **Recently deleted messages** for the `snipe` command: the content, author and attachment URL of the last deleted message in each channel, kept for a maximum of 10 minutes.
- Command cooldowns and cached server settings.

## 3. Data we process but do not store

To operate, Fab receives events from Discord. The following is processed in real time and then discarded:

- **Message content**, to detect prefix commands, award XP, clear AFK status and relay chatbot messages. Message text is not logged or stored, except as described in sections 2.6 and 2.7.
- **Member join, leave and update events**, to post welcome and leave messages, log role or nickname changes to a server's configured log channel, re-apply an active mute to a member who rejoins, and update member-count channels.
- **Presence (online status and current activity)**, shown only when someone runs `userinfo` or `rank`. Presence is never stored.
- **Voice state**, to know which voice channel to join for music playback.

Deleted-message logging and role/nickname logging only happen in servers where an administrator has configured a log channel with `setlogs`. Those log messages are posted into that server's own channel, which the server controls.

## 4. Third-party services

Depending on the command used, Fab sends the minimum necessary request to these services. Your Discord user ID is **not** sent to any of them.

- **OpenAI** – chatbot replies and transcript titles (your chat messages are sent).
- **YouTube, Spotify, lyrics providers** – music search and playback (search terms and URLs you provide).
- **Google Custom Search, Instagram, npm, Open Trivia DB, NewsAPI, nekos.life** – fun and utility commands (the search term you provide).
- **MongoDB** – the database described above, hosted on infrastructure controlled by the operator.

## 5. Data retention summary

| Data | Retained for |
|---|---|
| Server settings | Until changed, disabled or the bot leaves the server |
| XP and levels | Until deleted on request or leveling data is reset |
| Warnings | Until cleared by a moderator |
| Mutes | Until the mute expires or is lifted |
| AFK status | Until you next speak or react |
| Playlists | Until you delete them |
| Chatbot transcripts | 10 days, then deleted automatically |
| Chatbot attachments | Until deleted on request |
| Sniped messages | 10 minutes, in memory only |

## 6. Your rights and data deletion

You can ask for any data Fab holds about you to be viewed or deleted at any time. Contact the operator in the support server (https://discord.gg/ErYkePGWPS) or by DM to `papaemeritus.4` with your Discord user ID. Requests are handled manually and normally completed within 14 days.

Server administrators can remove all server configuration by kicking the bot and asking for the server's records to be deleted.

## 7. Children

Fab is intended for users who meet Discord's minimum age requirement (13, or higher where local law requires). We do not knowingly collect data from anyone below that age.

## 8. Security

The database and bot token are protected with access credentials known only to the operator. No system is perfectly secure; if a breach affecting user data is discovered, affected servers will be notified via the support server.

## 9. Changes to this policy

This policy may be updated as features change. The "Last updated" date at the top will change, and significant changes will be announced in the support server. Continued use of the bot after a change means you accept the updated policy.

## 10. Contact

- Support server: https://discord.gg/ErYkePGWPS
- Discord: `papaemeritus.4`
- Source code and issues: https://github.com/Fab-is-insane/Fab

import discord
from discord.ext import commands

client = commands.Bot(command_prefix='!')

@client.command()
async def ping(ctx):
    await ctx.send({content: 'Pong!'})

client.run('TOKEN')
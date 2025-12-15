import { Client, GatewayIntentBits, Events, Partials } from 'discord.js';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]
});

client.once(Events.ClientReady, () => {
    console.log('Bot is online!');
});

// Gestion des messages supprimés avec cache

const messageCache = new Map();

client.on(Events.MessageCreate, (message) => {
    // Ignorer les messages des bots pour éviter les boucles
    //if (message.author.bot) return;
    
    // Stocker les messages récents (avec une limite)
    messageCache.set(message.id, {
        content: message.content,
        author: message.author.tag,
        channelId: message.channelId,
        timestamp: Date.now()
    });

    //Vérifier si le user est "sparky_8085_19260" si oui changer l'author par "Salope"
    switch (message.author.tag) {
        case "sparky_8085_19260":
            {
                const cachedMessage = messageCache.get(message.id);
                if (cachedMessage) {
                    cachedMessage.author = "La Salope";
                    messageCache.set(message.id, cachedMessage);
                }
                break;
            }
        case "maxime_n2":
            {
                const cachedMessage = messageCache.get(message.id);
                if (cachedMessage) {
                    cachedMessage.author = "Le Dormeur";
                    messageCache.set(message.id, cachedMessage);
                }
                break;
            }
        case "mrk420_":
            {
                const cachedMessage = messageCache.get(message.id);
                if (cachedMessage) {
                    cachedMessage.author = "Le Daron";
                    messageCache.set(message.id, cachedMessage);
                }
                break;
            }
        case "amauryd":
            {
                const cachedMessage = messageCache.get(message.id);
                if (cachedMessage) {
                    cachedMessage.author = "Pudi Pudi";
                    messageCache.set(message.id, cachedMessage);
                }
                break;
            }
        case "harian_yamienne":
            {
                const cachedMessage = messageCache.get(message.id);
                if (cachedMessage) {
                    cachedMessage.author = "Jesus";
                    messageCache.set(message.id, cachedMessage);
                }
                break;
            }
    }
    
    // Nettoyer les vieux messages (> 24h)
    if (messageCache.size > 10000) {
        const dayAgo = Date.now() - 86400000;
        for (const [id, data] of messageCache) {
            if (data.timestamp < dayAgo) {
                messageCache.delete(id);
            }
        }
    }
});

client.on(Events.MessageDelete, async (message) => {
    const cached = messageCache.get(message.id);
    if (cached) {
        try {
            // Récupérer le channel via son ID
            const channel = await client.channels.fetch(cached.channelId);
            
            // Vérifier que c'est un channel de texte
            if (channel?.isTextBased()) {
                await message.channel.send(`"${cached.content}" supprimé par *${cached.author}*`);
            }
            
            messageCache.delete(message.id);
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
    } else {
        console.log("Message supprimé (pas en cache) - ID:", message.id);
    }
});

// Quand une réaction est ajoutée
client.on(Events.MessageReactionAdd, async (reaction, user) => {
    // Si la réaction est partielle, la récupérer complètement
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Erreur lors de la récupération de la réaction:', error);
            return;
        }
    }
    
    console.log(`${user.tag} a réagi avec ${reaction.emoji.name}`);
    
    // Ignorer les réactions des bots
    //if (user.bot) return;
    
    // Exemple : réagir à une réaction spécifique
    switch (reaction.emoji.name) {
        case '🫦':
            reaction.message.channel.send(`${user} a l'aire d'aimé ça 👀 👀 👀`);
            break;
        case '😴':
            reaction.message.channel.send(`${user.tag} fait une sieste 😴... Zzzzzzz`);
            break;
        case '🔥':
            reaction.message.channel.send(`${user.tag} a mis le feu 🔥🔥🔥`);
            break;
        case '👍':
            reaction.message.channel.send(`${user.tag} approuve ce message 👍`);
            break;
        case '😂':
            reaction.message.channel.send(`${user.tag} trouve ça hilarant 😂`);
            break;
        default:
            reaction.message.channel.send(`${user.tag} a réagi avec ${reaction.emoji.name}`);
            break;
    }
});

// Quand une réaction est retirée
client.on(Events.MessageReactionRemove, async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Erreur lors de la récupération de la réaction:', error);
            return;
        }
    }
    
    console.log(`${user.tag} a retiré sa réaction ${reaction.emoji.name}`);
});

// Quand toutes les réactions d'un message sont retirées
client.on(Events.MessageReactionRemoveAll, async (message) => {
    console.log('Toutes les réactions ont été retirées du message');
});

// Quand toutes les réactions d'un emoji spécifique sont retirées
client.on(Events.MessageReactionRemoveEmoji, async (reaction) => {
    console.log(`Toutes les réactions ${reaction.emoji.name} ont été retirées`);
});


await client.login(process.env.BOT_TOKEN);
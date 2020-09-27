const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');
// Insira seu novo token na variavel token para se comunicar com seu Bot do Telegram
// Bot de Exemplo @digital_one_fit_hebert_bot
const token = '1359974300:AAHoBaZsXjA5JBl7d6sRNh9J-bETnSXS3Pw';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async function(msg){
    const chatId = msg.chat.id;
    console.log(msg.text)

    const dfResponse = await dialogflow.sendMessage(chatId.toString(),msg.text);

    let responseText = dfResponse.text;

    
    if(dfResponse.intent === 'Trailler Resident Evil 8'){
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.Resident.stringValue);
    }
    
    bot.sendMessage(chatId, responseText);
});


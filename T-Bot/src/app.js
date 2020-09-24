require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const token = process.env.TOKEN;
const request = require('request');
var json;
let settings = { method: "Get" };
// Created instance of TelegramBot
const bot = new TelegramBot(token, {
    polling: true
});


bot.onText(/\/getTempf/,(msg,match) => {
  const chatId = msg.chat.id;
  let url = "http://192.168.43.181/temp.json";
  let options = {json: true};
  request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        // do something with JSON, using the 'body' variable
        json = res.body;
        JSON.stringify(json);
        console.log(res.body);
    };
    var msg = "Current temperature in fahreneit is "
    msg+= JSON.parse(json.tempF);
    msg+= "F."
    bot.sendMessage(chatId,msg);
  });
});

bot.onText(/\/getTemp/,(msg,match) => {
  const chatId = msg.chat.id;
  let url = "http://192.168.43.181/temp.json";
  let options = {json: true};
  request(url, options, (error, res, body) => {
      if (error) {
          return  console.log(error)
      };
      if (!error && res.statusCode == 200) {
          // do something with JSON, using the 'body' variable
          json = res.body;
          JSON.stringify(json);
          console.log(res.body);
      };
      var msg = "Current temperature in Celsius is "
      msg+= JSON.parse(json.tempC);
      msg+= "C."
      bot.sendMessage(chatId,msg);
    });
});

bot.onText(/\/getHumidity/,(msg,match) => {
  const chatId = msg.chat.id;
  let url = "http://192.168.43.181/temp.json";
  let options = {json: true};
  request(url, options, (error, res, body) => {
      if (error) {
          return  console.log(error)
      };
      if (!error && res.statusCode == 200) {
          // do something with JSON, using the 'body' variable
          json = res.body;
          JSON.stringify(json);
          console.log(res.body);
      };
      var msg = "Current Humidity is "
      msg+= JSON.parse(json.humidity);
      msg+= "%."
      bot.sendMessage(chatId,msg);
    });
});
// Listener (handler) for showcasing different keyboard layout
bot.onText(/\/keyboard/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Alternative keybaord layout', {
        'reply_markup': {
            'keyboard': [['\/getTempF', '\/getTempC'], ['\/getHumidity'], ['\/start']],
            resize_keyboard: true,
            one_time_keyboard: true,
            force_reply: true,
        }
    });
});

bot.onText(/\/status/,(msg,match) => {
  const chatId = msg.chat.id;
  let url = "http://192.168.43.181/temp.json";
  let options = {json: true};
  request(url, options, (error, res, body) => {
      if (error) {
          return  console.log(error)
      };

      if (!error && res.statusCode == 200) {
          // do something with JSON, using the 'body' variable
          json = res.body;
          JSON.stringify(json);
          console.log(res.body);
      };
      var msg = "Current Temperature of the room is "
      if(JSON.parse(json.humidity)>70){
        var msgx = "It sure really is sweaty. Make sure to turn on your fan and have a cool drink or two eh?";
        bot.sendMessage(chatId,msgx);
        msgx = "Please charge me too will you?";
        bot.sendMessage(chatId,msgx);
        msgx = "Don't dry your clothes out there, coz who knows if it might rain. Do it at your own risk and don't blame me later :p"
        bot.sendMessage(chatId,msgx);
      }
      else{
        var msgx = "Well what a nice weather we have got here. Take a stroll outside. Enjoy this moment but not without me!!";
        bot.sendMessage(chatId,msgx);
        msgx="Fun fact: You can do all the stuffs that require a good weather. What are you waiting for?";
        bot.sendMessage(chatId,msgx);
      }
    });
});

bot.onText(/\/start/, (msg) => {
  var welcome = "Welcome to tempAssist, " + msg.chat.username +".\n";
     welcome += "You can detect your room's temperature,humidity and it will also send you notifications if it's raining.\n\n";
     welcome += "/getTemp : for getting the temperature value in your room\n";
     welcome += "/getHumidity : for getting humidity values in your room\n";
     welcome += "/getTempf : temperature value in fahreneit\n";
     welcome += "/status : Returns current status of room\n";
     welcome += "/keyboard : Returns reply keyboard"
    const chatId = msg.chat.id;
    bot.sendMessage(
        chatId,welcome);
});

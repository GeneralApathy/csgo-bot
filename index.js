console.log("CSGO-Bot initiating...");

const nodeogram = require("nodeogram");
const fs = require("fs");
const skins = require("./lib/skins");
const stats = require("./lib/stats");
const inventories = require("./lib/inventories");
var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const base_weapon = "http://steamcommunity.com/market/listings/730/";
const base_knife = "http://steamcommunity.com/market/listings/730/%E2%98%85%20"
const base_price = "http://steamcommunity.com/market/priceoverview/?country=IT&currency=3&appid=730&market_hash_name=";
const base_stats = "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=" + config.devkey + "&steamid=";

process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("It seems that Node couldn't handle that, btw it's all good (unhandledException) :D");
  console.log("Node.js > Hey there! I'm alive!");
});

console.log("Modules loaded");

var date = new Date();

bot = new nodeogram.Bot(config.key);
bot.init();
var cooldown = [];
console.log("Bot initiated");

bot.command("start", "Starts the bot", false, (args, message) => {

  message.reply(
    "<b> - Welcome to the CSGO-Bot - </b>\n"+
    "This bot can fetch <b>skins</b>, <b>inventories</b> and <b>players'</b> statistics.\n\n"+
    "This bot's source code can be found on <a href='https://github.com/GeneralApathy/csgo-bot'> GitHub </a>\n"+
    "Mantained & hosted by @GeneralApathy"
    , {parse_mode: "HTML"});

});

bot.command("weapon", "Fetches a weapon", false, (args, message) => {

  if(cooldown.contains(message.from.id)){

    console.log(message.from.id + " has been blocked by the flood protection");
    message.reply("(Flood protection) Wait 3,5 secs to make that command again.");
    return false;

  }

  var weapon = args.toString().replace(/,/g, " ");

  if(weapon == ""){

    message.reply("Are you searching for 'nothing'?");
    return false;

  }

  console.log("► " + message.from.id + " (" + message.from.username + ") is searching for: " + weapon);

  skins.getWeapon(base_weapon + encodeURI(weapon) + "/render?start=0&count=1&currency=3&language=english&format=json", (err, reqErr, response) => {

    console.log("\t ► Beginning request to Steam web API (weapon)");

    if(err){

      message.reply("This weapon doesn't exist", {parse_mode: "HTML"});
      console.log("\t ► The weapon searched doesn't exist");
      console.log("► End.");
      return false;

    }
    if(reqErr){

      throw reqErr;
      message.reply("Error processing the <b>weapon</b> request", {parse_mode: "HTML"});
      console.log("\t\t ► Error during the weapon request. RIP.");
      console.log("► End.");
      return false;

    }

    console.log("\t ► Weapon exists. Searching for price.");

    skins.getPrice(base_price + weapon, (reqErr, price) => {

      if(reqErr){

        throw reqErr;
        message.reply("Error processing the <b>price</b> request", {parse_mode: "HTML"});
        console.log("\t ► Error during the price request. RIP.");
        console.log("► End.");
        return false;

      }

      message.reply("<b> ► " + response.name + " - " + response.collection + " </b>\n\n~~~~~~\n\n" +
      response.description + "\n\n ~~~~~~" +
      "\n<b>► Price</b>: " + price +
      "\n<b>► ID</b>: " + response.id +
      "\n<b>► Total count</b>: "+ response.total_count +
      "\n\n<a href='http://cdn.steamcommunity.com/economy/image/" + response.icon + "'>Image</a>"
      , {parse_mode: "HTML"});

      console.log("► End.");

      cooldown.push(message.from.id);

      setTimeout(function(){

        cooldown.remove(message.from.id);

      }, 3500);

    });

  });

});

bot.command("knife", "Fetches a knife", false, (args, message) => {

  if(cooldown.contains(message.from.id)){

    console.log(message.from.id + " has been blocked by the flood protection");
    message.reply("(Flood protection) Wait 3,5 secs to make that command again.");
    return false;

  }

  var knife = args.toString().replace(/,/g, " ");

  if(knife == ""){

    message.reply("Are you searching for 'nothing'?");
    return false;

  }

  console.log("► " + message.from.id + " (" + message.from.username + ") is searching for: " + knife);

  skins.getKnife(base_knife + encodeURI(knife) + "/render?start=0&count=1&currency=3&language=english&format=json", (err, reqErr, response) => {

    console.log("\t ► Beginning request to Steam web API (weapon)");

    if(err){

      message.reply("This knife doesn't exist", {parse_mode: "HTML"});
      console.log("\t ► The knife searched doesn't exist");
      console.log("► End.");
      return false;

    }
    if(reqErr){

      throw reqErr;
      message.reply("Error processing the <b>knife</b> request", {parse_mode: "HTML"});
      console.log("\t\t ► Error during the knife request. RIP.");
      console.log("► End.");
      return false;

    }

    console.log("\t ► Knife exists. Searching for price.");

    skins.getPrice(base_price + "%E2%98%85%20" + knife, (reqErr, price) => {

      if(reqErr){

        throw reqErr;
        message.reply("Error processing the <b>price</b> request", {parse_mode: "HTML"});
        console.log("\t ► Error during the price request. RIP.");
        console.log("► End.");
        return false;

      }



      message.reply("<b> ► " + response.name + "</b>" +
      "\n<b>► Price</b>: " + price +
      "\n<b>► ID</b>: " + response.id +
      "\n<b>► Total count</b>: "+ response.total_count +
      "\n\n<a href='http://cdn.steamcommunity.com/economy/image/" + response.icon + "'>Image</a>"
      , {parse_mode: "HTML"});

      console.log("► End.");

      cooldown.push(message.from.id);

      setTimeout(function(){

        cooldown.remove(message.from.id);

      }, 3500);

    });

  });

});

bot.command("case", "Fetches a case", false, (args, message) => {

  if(cooldown.contains(message.from.id)){

    console.log(message.from.id + " has been blocked by the flood protection");
    message.reply("(Flood protection) Wait 3,5 secs to make that command again.");
    return false;

  }

  var acase = args.toString().replace(/,/g, " ");
  if(acase == ""){

    message.reply("Are you searching for 'nothing'?");
    return false;

  }

  console.log("► " + message.from.id + " (" + message.from.username + ") is searching for: " + acase);

  skins.getCase(base_weapon + encodeURI(acase) + "/render?start=0&count=1&currency=3&language=english&format=json", (err, reqErr, response) => {

    console.log("\t ► Beginning request to Steam web API (weapon)");

    if(err){

      message.reply("This case doesn't exist", {parse_mode: "HTML"});
      console.log("\t ► The case searched doesn't exist");
      console.log("► End.");
      return false;

    }
    if(reqErr){

      throw reqErr;
      message.reply("Error processing the <b>case</b> request", {parse_mode: "HTML"});
      console.log("\t\t ► Error during the case request. RIP.");
      console.log("► End.");
      return false;

    }

    console.log("\t ► Case exists. Searching for price.");

    skins.getPrice(base_price + acase, (reqErr, price) => {

      if(reqErr){

        throw reqErr;
        message.reply("Error processing the <b>price</b> request", {parse_mode: "HTML"});
        console.log("\t ► Error during the price request. RIP.");
        console.log("► End.");
        return false;

      }

      var n = response.items.length;
      var weapons = [];

      for(var i = 0; i<n; i++){

        weapons.push(response.items[i]["value"]);

      }

      var toPrint = weapons.toString().replace(/,/g, "\n");

      message.reply("<b> ► " + response.name + "</b>" +
      "\n" + toPrint +
      "\n<b>► Price</b>: " + price +
      "\n<b>► ID</b>: " + response.id +
      "\n<b>► Total count</b>: "+ response.total_count +
      "\n\n<a href='http://cdn.steamcommunity.com/economy/image/" + response.icon + "'>Image</a>"
      , {parse_mode: "HTML"});

      console.log("► End.");

      cooldown.push(message.from.id);

      setTimeout(function(){

        cooldown.remove(message.from.id);

      }, 3500);

    });

  });

});

bot.command("stats", "Fetches stats for the player inserted", false, (args, message) => {

  var profile = args.toString().replace(/,/g, " ");

  stats.getStats(base_stats, profile, function(err, response){

    console.log(response);

  });

});

Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}

/* Thanks StackOverflow */

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

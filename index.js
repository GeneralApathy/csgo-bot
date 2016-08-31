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

bot.command("help", "Show the help message", false, (args, message) => {



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

  if(cooldown.contains(message.from.id)){

    console.log(message.from.id + " has been blocked by the flood protection");
    message.reply("(Flood protection) Wait 3,5 secs to make that command again.");
    return false;

  }

  var profile = args[0].toString();
  var vac;
  var tradeBan;
  var toPrint;

  console.log(args);

  if(!args[1]){

    message.reply("Correct syntax: /stats <customURL/steamID64> <csgo/steam>\n"
    + "Example: /stats generalapathy_ steam");

    return false;

  }

  if(profile == ""){

    message.reply("Are you searching for 'nothing'?");
    return false;

  }

  stats.getStats(base_stats, profile, function(iderror, err, stats, idStats){

    if(iderror){

      message.reply("Custom URL/SteamID64 not found");
      return false;

    }

    if(err){

      message.reply("Request error");
      return false;

    }

    if(idStats.profile.vacBanned == 0){

      vac = "<i>No VAC bans</i>";

    }else{

      vac = "<b>VAC banned</b>";

    }

    if(idStats.profile.tradeBanState == "None"){

      tradeBan = "\n<i>Not trade banned</i>";

    }else{

      tradeBan = "\n<b>Trade banned</b>"

    }

    switch(args[1].toLowerCase()){

      case "steam":

      console.log();

      if(idStats.profile.mostPlayedGames == undefined){

        toPrint = "<i> None </i>"

      }else{

        var mostPlayedGames = idStats.profile.mostPlayedGames[0]["mostPlayedGame"];
        var gamesArray = [];

        for(key in mostPlayedGames){

          if(typeof mostPlayedGames[key]["gameName"] == 'undefined') break;

            gamesArray.push({"gamename": mostPlayedGames[key]["gameName"], "hoursPlayed": mostPlayedGames[key]["hoursOnRecord"]});

        }

        var n = gamesArray.length;
        var games = [];

        for(var i = 0; i<n; i++){

          games.push(gamesArray[i]["gamename"] + " (" + gamesArray[i]["hoursPlayed"] + "h)");

        }

        var converted = games.toString().replace(/,/g, "☼");
        toPrint = converted.replace(/☼/g, ", ");

      }

      message.reply(
      "<a href='" + idStats.profile.avatarFull[0] + "'>Avatar</a>" +
      "\n<b>Username</b>: " + idStats.profile.steamID +
      "\n<b>SteamID64</b>: " + idStats.profile.steamID64 +
      "\n<b>Status</b>: " + idStats.profile.onlineState +
      "\n<b>Profile privacy</b>: " + idStats.profile.privacyState +
      "\n<b>From</b>: " + idStats.profile.location +
      "\n<b>Member since</b>: " + idStats.profile.memberSince +
      "\n" + vac +
      tradeBan +
      "\n<b>Last games played</b>: " + toPrint
     , {parse_mode: "HTML"});

      break;

      case "csgo":

      if(stats.playerstats == undefined){

        message.reply("It seems that this user doesn't have CS:GO in his library");
        return false;
      }

      var keys = [

        "total_kills",
        "total_deaths",
        "total_planted_bombs",
        "total_defused_bombs",
        "total_kills_knife",
        "total_kills_headshot",
        "total_wins_pistolround",
        "total_wins_map_de_dust2",
        "last_match_wins",
        "total_shots_fired",
        "total_shots_hit",
        "total_rounds_played",
        "total_kills_taser",
        "last_match_kills",
        "last_match_deaths",
        "total_kills_hegrenade",

      ];

      function hasValue(obj, key, value) {
        return obj.hasOwnProperty(key) && obj[key] === value;
      }

      var resArray = stats.playerstats.stats;
      var statsArray = [];

      for (var i = 0; i < keys.length; i++) {

        resArray.some(function(found){

          if(hasValue(found, "name", keys[i])){

            statsArray.push(found);

          }

        });

        if(typeof statsArray[i] == 'undefined'){

          console.log("HEY: " + keys[i]);
          statsArray.push({"name": keys[i], "value": 'None'});

        }
      }

      console.log(statsArray);

      var wins = statsArray[8].value;
      var msg;

      if(wins == 16){

        msg = "\n<i>Last match won</i>";

      }

      if(wins == 15){

        msg = "\n<i>Last match tied</i>";

      }

      if(wins < 15){

        msg = "\n<i>Last match lost</i>";

      }

      message.reply(
      "<a href='" + idStats.profile.avatarFull[0] + "'>Avatar</a>" +
      "\n<b>Total kills</b>: " + statsArray[0].value +
      "\n<b>Total deaths</b>: " + statsArray[1].value +
      "\n<b> K/D Ratio</b>: " + (statsArray[0].value / statsArray[1].value).toFixed(2) +
      "\n<b>Total planted bombs</b>: " + statsArray[2].value +
      "\n<b>Total defused bombs</b>: " + statsArray[3].value +
      "\n<b>Knife kills</b>: " + statsArray[4].value +
      "\n<b>Zeus kills</b>: " + statsArray[12].value +
      "\n<b>Grenade kills</b>: " + statsArray[15].value +
      "\n<b>Headshots</b>: " + statsArray[5].value +
      "\n<b>Pistol rounds won</b>: " + statsArray[6].value +
      "\n<b>Shots fired</b>: " + statsArray[9].value +
      "\n<b>Shots hit</b>: " + statsArray[10].value +
      "\n<b>Rounds played</b>: " + statsArray[11].value +
      "\n<b>Rounds played on de_dust2</b>: " + statsArray[7].value +
      msg +
      "\n<b>Last match kills</b>: " + statsArray[13].value +
      "\n<b>Last match deaths</b>: " + statsArray[14].value +
      "\n<b>Last match K/D</b>: " + (statsArray[13].value / statsArray[14].value).toFixed(2)
      ,{parse_mode: "HTML"});

      break;

      default:
      break;

    }

    cooldown.push(message.from.id);

    setTimeout(function(){

      cooldown.remove(message.from.id);

    }, 3500);


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

const xml = require("xml2js").parseString;
const request = require("request");
var err;

module.exports.customTo64 = (customurl, callback) => {

  if(customurl.includes("76561198")){

    console.log("Already a SteamID64");

    request({url: "http://steamcommunity.com/profiles/"+ customurl +"/?xml=1", method: "GET"}, (error, response, body) => {

      if(!error && response.statusCode == 200){

        xml(body, function(err, result){

          if(err){

            callback(err, null);
            return false;

          }

          var parsed = JSON.parse(JSON.stringify(result));

          if(parsed.response){

            err = new Error("customURL not found");

            return callback(err, null);

          }

          return callback(null, parsed);

        });

      }else{

        throw error;
        return false;

      }

    });

    return true;

  }

  request({url: "http://steamcommunity.com/id/"+ customurl +"/?xml=1", method: "GET"}, (error, response, body) => {

    if(!error && response.statusCode == 200){

      xml(body, function(err, result){

        if(err){

          callback(err, null);
          return false;

        }

        var parsed = JSON.parse(JSON.stringify(result));

        if(parsed.response){

          err = new Error("Custom URL not found");
          return callback(err, null);

        }

        return callback(null, parsed);

      });

    }else{

      throw error;
      return false;

    }

  });

}

module.exports.getStats = (stats_url, customurl, callback) => {

  this.customTo64(customurl, function(iderror, parsed){

    if(iderror){

      callback(iderror, null, null, null);
      return false;

    }

    var id64 = parsed.profile["steamID64"][0];
    console.log(id64);
    console.log(stats_url + id64);

    request({url: stats_url + id64, method: "GET", timeout: 6500}, (error, response, body) => {

      if(error){

        throw error;
        callback(null, error, null, null);
        return false;

      }

      var parsedStats = JSON.parse(body);

      if(parsedStats == undefined){

        console.log("Nope...");
        return false;

      }

      callback(null, null, parsedStats, parsed);

    });

  });

}

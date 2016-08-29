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

}

module.exports.getStats = (stats_url, customurl, callback) => {

  this.customTo64(customurl, function(err, id64){

    request({url: stats_url + id64, method: "GET"}, (error, response, body) => {
      console.log(stats_url, id64);

      callback(null, body);

      console.log(body);

    });

  });

}

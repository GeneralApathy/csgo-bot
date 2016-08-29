const request = require("request");

var err;

module.exports.getPrice = function(url, callback){

  request({url: url, method: 'GET'}, (error, response, body) => {

    if(!error && response.statusCode == 200){

      try{

        var json = JSON.parse(body);
        callback(null, json.median_price);

      }catch(error){

        return callback(error, null);

      }

    }

  });

}

module.exports.getWeapon = function(url, callback){

  request({url: url, method: 'GET'}, (error, response, body) => {

    var json = JSON.parse(body);

    if(!error && response.statusCode == 200){

      try{

        if(json.assets["730"]){

          var scan = json.assets["730"]["2"];

          var infos;
          for(var key in scan){

            if(scan.hasOwnProperty(key)){

              infos = scan[key];
              break;

            }else{

              err = new Error("Can't fetch infos");
              return callback(err, null, null);

            }

          }

          var response = {

            "name": infos["name"],
            "total_count": json["total_count"],
            "id": infos["id"],
            "icon": infos["icon_url"],
            "description": infos["descriptions"][2]["value"],
            "collection": infos["descriptions"][4]["value"],

          }

          return callback(null, null, response);

        }else{

          err = new Error("Weapon doesn't exist");
          return callback(err, null, null);

        }

      }catch(error){

        return callback(null, error, null);

      }

    }

  });
}

module.exports.getKnife = function(url, callback){

  request({url: url, method: 'GET'}, (error, response, body) => {

    var json = JSON.parse(body);

    if(!error && response.statusCode == 200){

      try{

        if(json.assets["730"]){

          var scan = json.assets["730"]["2"];

          var infos;
          for(var key in scan){

            if(scan.hasOwnProperty(key)){

              infos = scan[key];
              break;

            }else{

              err = new Error("Can't fetch infos");
              return callback(err, null, null);

            }

          }

          var response = {

            "name": infos["name"],
            "total_count": json["total_count"],
            "id": infos["id"],
            "icon": infos["icon_url"],

          }

          return callback(null, null, response);

        }else{

          err = new Error("Weapon doesn't exist");
          return callback(err, null, null);

        }

      }catch(error){

        return callback(null, error, null);

      }

    }

  });
}

module.exports.getCase = function(url, callback){

  request({url: url, method: 'GET'}, (error, response, body) => {

    var json = JSON.parse(body);

    if(!error && response.statusCode == 200){

      try{

        if(json.assets["730"]){

          var scan = json.assets["730"]["2"];

          var infos;
          for(var key in scan){

            if(scan.hasOwnProperty(key)){

              infos = scan[key];
              break;

            }else{

              err = new Error("Can't fetch infos");
              return callback(err, null, null);

            }

          }

          var response = {

            "items": infos["descriptions"],
            "name": infos["name"],
            "total_count": json["total_count"],
            "id": infos["id"],
            "icon": infos["icon_url"],

          }

          return callback(null, null, response);

        }else{

          err = new Error("Weapon doesn't exist");
          return callback(err, null, null);

        }

      }catch(error){

        return callback(null, error, null);

      }

    }

  });
}

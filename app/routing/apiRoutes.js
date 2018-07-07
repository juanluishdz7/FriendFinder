var friends = require("../data/friends");


module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var userInput = req.body;
    var userAns = userInput.scores;
    var matchName = '';
    var matchImage = '';
    var totalDiff = 10000;
    for (var i = 0; i < friends.length; i++) {
      var diff = 0;
      for (var j = 0; j < userAns.length; j++) {
        diff += Math.abs(friends[i].scores[j] - userAns[j]);
      }
      if (diff < totalDiff) {
        totalDiff = diff;
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
    }
    friends.push(userInput);
    res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  })
};
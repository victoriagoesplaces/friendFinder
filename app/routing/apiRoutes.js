// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// x* A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. // Routes

var friends = require("../data/friends.js")

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends)
    })

    app.post("/api/friends", function (req, res) {
        var friendMatch = {
            name: "",
            photo: "",
            scoreDiff: 10
        }
        
        console.log(req.body)

        var userInfo = req.body
        var userScores = userInfo.scores

        console.log(userScores)

        var totalDiff = 0

        for(var i = 0; i<friends.length; i++) {
        console.log(friends[i])
        totalDiff = 0

        for (var j = 0; j < friends[i].scores[j]; j++) {
            totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]))

            if (totalDiff <= friendMatch.scoreDiff) {
                friendMatch.name = friends[i].name
                friendMatch.photo = friends[i].photo
                friendMatch.scoreDiff = totalDiff
            }
        }
    }

    friends.push(userInfo)

    res.json(friendMatch)

})
} 

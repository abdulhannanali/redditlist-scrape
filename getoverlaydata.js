const mkdirp = require("mkdirp")
const request = require("request")
const fs = require("fs")
const async = require("async")

let overlayurl = "http://redditlist.com/getoverlaydata"

mkdirp.sync("./subredditdata/")


var subreddits = JSON.parse(fs.readFileSync("./subredditlist.json", "utf-8"))

async.parallelLimit(subreddits.map(function (subreddit) {	
	return function (callback) {
		request({
			method: "POST",
			uri: overlayurl,
			form: {
				subreddit: subreddit.targetSubreddit,
				adultfilter: subreddit.targetFilter
			}
		}, function (error, response, body) {
			try {
				if (body && JSON.parse(body)) {
					console.log("Subreddit " + subreddit.targetSubreddit)
					fs.writeFile("./subredditdata/" + subreddit.targetSubreddit + ".json", body)
				}
			}
			catch (error) {}

			callback(undefined, response)
		})
	}
}), 20, function (error, results)  {
	console.log(results.length)
})


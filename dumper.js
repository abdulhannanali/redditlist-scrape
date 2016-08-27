const mongoose = require("mongoose")
const fs = require("fs")

const subredditSchema = new mongoose.Schema({
	slug: String,
	title: String,
	flairstring: String,
	hot_rank: Number,
	subs_rank: Number,
	subscribers: String,
	categories: [
		String
	],
	over18: Boolean
})

const Subreddit = mongoose.model("Subreddit", subredditSchema)

mongoose.connect("mongodb://localhost/redditlist", function (error) {
	if (!error) {
		console.log("connected")
		exec()
	}
})


function exec () {

const subredditList = JSON.parse(fs.readFileSync("./subredditlist.json").toString())
var fileLocation = "./subredditdata/*.json"

subredditList.map(function (subreddit) {
	try {
		var subredditFile = JSON.parse(fs.readFileSync(fileLocation.replace("*", subreddit.targetSubreddit)).toString())
	}
	catch (error) {
		return
		console.error(error)
	}

	var details = JSON.parse(subredditFile[0])

	if (subredditFile[1]) {
		var categories = subredditFile[1]
	}

	var x = new Subreddit({
		subscribers: details.subscribers,
		subs_rank: details.subs_rank,
		over18: details.over18,
		hot_rank: details.hot_rank,
		flairstring: details.flairstring,
		title: details.title,
		slug: details.slug
	})

	if (categories) {
		x.categories = categories
	}

	x.save(function (error) {
		if (!error) {
			console.log(details.slug + " saved!")
		}
	})
})
}
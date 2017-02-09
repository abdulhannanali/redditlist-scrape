const request = require("request")
const cheerio = require("cheerio")
const mkdirp = require("mkdirp")

const fs = require("fs")

const totalPages = 35

const baseUrl = "http://redditlist.com/{category}"

let category = "all"

var requestUrl = baseUrl.replace("{category}", category)

let startPage = 0
let lastPage = 51

let subredditList = []

function parseIntWithCommas(s) {
	return parseInt(s.replace(/,/g, ''));
}

for (var i = startPage; i < lastPage; i++) {
	request({
		uri: requestUrl,
		qs: {
			page: i
		}
	}, function (error, response, body) {
		console.log("response received")

		if (error) {
			return
		}

		let $ = cheerio.load(body)

		var listings = $($(".span4.listing")[1]).children(".listing-item")

		for (var i = 0; i < listings.length; i++) {
			var $listing = $(listings[i]);
			var data = $listing.data();
			try {
				data.rank = parseIntWithCommas($listing.find('.rank-value').text());
			} catch (ex) {
				console.error("Can't get rank for " + data['targetSubreddit']);
			}

			try {
				data.subscribers = parseIntWithCommas($listing.find('.listing-stat').text());
			} catch (ex) {
				console.error("Can't get subscribers for " + data['targetSubreddit']);
			}

			subredditList.push(data);
			console.log("Total subreddits " + subredditList.length)
		}

		fs.writeFileSync("subredditlist.json", JSON.stringify(subredditList, null, 4))
	})
}

# redditlist.com scrape

[![Greenkeeper badge](https://badges.greenkeeper.io/abdulhannanali/redditlist-scrape.svg)](https://greenkeeper.io/)

These scrapers written in [node.js](https://nodejs.org) are some utilities I used for scraping redditlist.com for a usecase. It's the whole dataset available at redditlist.com at the time of scraping. You can figure out and run the scrapers yourself if you want to redownload the latest data.

## Where can you find the data?

The data is available here in two formats
- json
- mongodb data dump

### json
This was the format in which the data was originally downloaded

The index file with the slugs of all the subreddits is in [subrdditlist.json](subredditlist.json) and all the subreddits details are in the [subredditdata directory](subredditdata/). They are named according to their slugs with a .json following

### datadump
This is a single file named [dumparchive](dumparchive) and created using MongoDB's mongodump CLI utility. You can go to it's help page to figure out how to get this working in mongodb but it's fairly easy. GOOD LUCK! :smile: 


### LICENSE
WTF? Seriously, I don't give a fuck do whatever you want.
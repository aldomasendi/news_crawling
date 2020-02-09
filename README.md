# news_crawling
Crawlling Berita Online


# start
npm install

# RUN index
node index.js --path=001_detik

# FOREVER RUN index
forever start index.js --path=001_detik

# crawling status
status_crawling = 1, no content
status_crawling = 2, crawling complete
status_crawling = 0, crawling failed
const cheerio = require('cheerio');
const config = require('../config');
const request = require('request');

class Parser {
	constructor(selector){
		this.selector = selector;
	}

	getIndex(html) {
   		const $ = cheerio.load(html);
		const selector = this.selector.selector;


		const parsedIndex = [];

        $(selector.container).each(function(index) {
			let title = '';
			let url = '';
			let meta = {};
			let category = null;
			let tags = null;

            title = $(this).find(selector.title.tag).text().trim();
            url = `${selector.url.baseUrl}${$(this).find(selector.url.tag).attr('href')}`;

            meta.img = `${selector.meta.img.baseUrl}${$(this).find(selector.meta.img.tag).attr('src')}`;

            if(selector.meta.time.attr) {
            	meta.time = $(this).find(selector.meta.time.tag).attr(selector.meta.time.attr);
            } else {
            	meta.time = $(this).find(selector.meta.time.tag).text().trim();
            }

        	if(selector.category) category = $(this).find(selector.category.tag).text().trim();
        	if(selector.tags) tags = $(this).find(selector.tags.tag).text().trim();

        	parsedIndex.push({title, url, meta, category, tags});
        })

        return parsedIndex;
	}

    getHtml({url}) {
        const agents = config.agents;

        const options = {
            headers: {
                'User-Agent': agents[Math.floor(Math.random() * agents.length)]
            }
        }

        return new Promise(function (resolve, reject){
            request(url, options, function(error, response, body) {
                if(error) reject(error);

                return resolve(body);
            })
        })
    }
}

module.exports = Parser;
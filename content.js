const argv = require('minimist')(process.argv.slice(2));
const config = require('./config');
const mysql = require('./db/mysql');
const util = require('./lib/util');

main();

async function main() {
	try	{
		util.debug('--- STARTING CRAWLING CONTENT ---')

		const mysql = require('./db/mysql');
		const Sql = require(`./query/sql`);
		const sql = new Sql(mysql);

		const transformFile = require('./lib/transform');
		const transform = new transformFile();

		while(true) {
			const index = await sql.getIndex();

			if(index.length > 0) {
				for (const news of index) {
					util.debug(`Getting content from ${news.url}`);
				}
			} else {
				util.debug(`All content had been collected`);
			}

			util.debug(`Worker sleep for ${config.sleepTime.content/60000} minutes..`);
			await util.sleep(config.sleepTime.content);
		}
	} catch(error) {
		util.throw(error);
	}
}
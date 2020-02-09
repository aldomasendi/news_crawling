const argv = require('minimist')(process.argv.slice(2));
const config = require('./config');
const mysql = require('./db/mysql');
const util = require('./lib/util');

main();

async function main() {
	try	{
		util.debug('--- STARTING CRAWLING INDEX ---')

		const mysql = require('./db/mysql');
		const Sql = require(`./query/sql`);
		const sql = new Sql(mysql);

		const path = argv.path;
		const selector = require(`./selector/index/${path}`);
		const parserFile = require('./lib/parser');
		const parser = new parserFile(selector);

		const transformFile = require('./lib/transform');
		const transform = new transformFile();

		const {...source} = await sql.getSource(path);

		while(true) {
			util.debug(`Get index from ${selector.path}`);

			const html = await parser.getHtml(selector);
			const parsedIndex = parser.getIndex(html);
			let duplicate = 0;

			if(parsedIndex.length > 0) {
				let {sqlInsert, success, failed} = transform.toSqlIndex(parsedIndex, source);

				if(sqlInsert.length > 0) {
					for (const data of sqlInsert) {
						try{
							await sql.bulkInsert(data);
						} catch (error) {
							if(error.code != 'ER_DUP_ENTRY') {
								util.throw(error);
							} else{
								duplicate++;
							}
						}
					}
				}

				util.debug(`Success: ${success - duplicate}, failed: ${failed}, duplicate: ${duplicate}`);
			} else {
				util.debug(`No news index collected`);
			}

			util.debug(`Worker sleep for ${config.sleepTime.index/60000} minutes..`);
			await util.sleep(config.sleepTime.index);
		}
	} catch(error) {
		util.throw(error);
	}
}
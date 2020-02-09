class Transform {
	toSqlIndex(parsedIndex, source) {
        const sqlInsert = [];
        let success = 0;
        let failed = 0;

        for(const row of parsedIndex) {
            if((row.url == '#') || (!row.url) || (!row.title)) {
                failed++;
                continue;
            }

            sqlInsert.push({
                id_source: source.id_source,
                url: row.url,
                title: row.title,
                meta: JSON.stringify(row.meta),
                category: row.category,
                tags: row.tags,
            })

            success++;
        }

        return {sqlInsert, success, failed}
	}
}

module.exports = Transform;
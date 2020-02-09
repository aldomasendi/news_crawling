const moment = require('moment-timezone');
moment().tz("Asia/Jakarta").format();

class MysqlQuery {
    constructor(db){
        this.db = db;
    }

    getSource(path){
        const _this = this;

        return new Promise(function (resolve, reject){
                                    _this.getSourceQuery(path).then(function (rowPacket){
                                        return resolve(rowPacket[0]);
                                    }). catch (function (error){
                                        reject(error);
                                    });
                                });
    }

    getIndex(){
        const _this = this;

        return new Promise(function (resolve, reject){
                                    _this.getIndexQuery().then(function (rowPacket){
                                        return resolve(_this.toIndex(rowPacket));
                                    }). catch (function (error){
                                        reject(error);
                                    });
                                });
    }

    getSourceQuery(path){
        const sql = `SELECT * FROM source WHERE path = ? LIMIT 1`;

        return sqlQuery(this.db, sql, [path]);
    }

    getIndexQuery(){
        const sql = `SELECT * FROM news p1
                    LEFT JOIN source AS p2 ON p2.id_source = p1.id_source
                    WHERE p1.status_crawling = 1
                    ORDER BY p1.created_at LIMIT 10`;

        return sqlQuery(this.db, sql);
    }

    toIndex(rowPacket) {
        const index = [];

        for(const row of rowPacket) {
            index.push({
                id_news: row.id_news,
                id_source: row.id_source,
                url: row.url,
                source_name: row.source_name,
                path: row.path
            });
        }

        return index;
    }

    bulkInsert(data){
        const sql = 'INSERT INTO news SET ?';

        return sqlQuery(this.db, sql, data)
    }

    sentToQueue(notificationId, bodyEmail) {
        const sql = `INSERT INTO notification_email_queue
                    (id_notification_email, body_email)
                    VALUES (${notificationId}, "${encodeURIComponent(bodyEmail)}")`;

        return sqlQuery(this.db, sql);
    }
}

function sqlQuery(db, sql, params){
    return new Promise(function (resolve, reject){
        if (params) {
            return db.query(sql, params, function (error, rows){
                if (error) return reject(error);
                resolve(rows);
            });
        }

        return db.query(sql, function (error, rows){
            if (error) return reject(error);

            resolve(rows);
        });
    });
}

module.exports = MysqlQuery;
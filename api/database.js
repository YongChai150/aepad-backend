//require('dotenv').config()  // Comment this when deploying to heroku

const mysql = require('mysql')

class Database {

    constructor() {

        if (this.instance) return this.instance
        Database.instance = this


        this.pool = mysql.createPool(
            {
                connectionLimit: process.env.DATABASE_CONNECTION_LIMIT || 10,
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME
            }
        )

    }

    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, params, (err, result) => {
                if (err) return reject(err)
                return resolve(result)
            })
        })
    }
}

module.exports = new Database()

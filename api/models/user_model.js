const database = require('../database')

class UserModel {

    constructor() {
        if (this.instance) return this.instance
        UserModel.instance = this
    }

    get() {
        return database.query("SELECT * FROM users")
    }

    async getByLogin(users) {
        const rows = await database.query('SELECT * FROM users WHERE username = ? AND password = ?', [users.username, users.password])
        return rows[0]
    }


    async getById(id) {
        const rows = await database.query('SELECT * FROM users WHERE id = ?', [id])
        return rows[0]
    }

    create(users) {
        return database.query('INSERT INTO users (username,fullname,role,email,password,handphone1,handphone2) VALUES (?,?,?,?,?,?,?)', [users.username, users.fullname, users.role, users.email, users.password, users.handphone1, users.handphone2])
    }

    delete(id) {
        return database.query('DELETE FROM users WHERE id = ? ', [id])
    }

    update(id, users) {
        const fields = []
        const params = []

        for (const attribute in users) {
            fields.push('?? = ?')
            params.push(attribute, users[attribute])
        }

        const stmt = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`
        return database.query(stmt, [...params, parseInt(id)])
    }
}

module.exports = new UserModel
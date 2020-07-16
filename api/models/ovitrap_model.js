const database = require('../database')

class OvitrapModel {

    constructor() {
        if (this.instance) return this.instance
        OvitrapModel.instance = this
    }

    get() {
        return database.query("SELECT * FROM ovitrap")
    }


    async getById(id) {
        const rows = await database.query('SELECT * FROM ovitrap WHERE ovitrapID = ?', [id])
        return rows[0]
    }

    create(ovitrap) {
        return database.query('INSERT INTO ovitrap (location,installWeek,dateInstall,removeWeek,dateRemove) VALUES (?,?,?,?,?)', [ovitrap.location, ovitrap.installWeek, ovitrap.dateInstall, ovitrap.removeWeek, ovitrap.dateRemove])
    }

    delete(id) {
        return database.query('DELETE FROM ovitrap WHERE ovitrapID = ? ', [id])
    }

    update(id, ovitrap) {
        const fields = []
        const params = []

        for (const attribute in ovitrap) {
            fields.push('?? = ?')
            params.push(attribute, ovitrap[attribute])
        }

        const stmt = `UPDATE ovitrap SET ${fields.join(', ')} WHERE ovitrapID = ?`
        return database.query(stmt, [...params, parseInt(id)])
    }
}

module.exports = new OvitrapModel
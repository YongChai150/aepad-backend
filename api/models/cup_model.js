const database = require('../database')

class CupModel {

    constructor() {
        if (this.instance) return this.instance
        CupModel.instance = this
    }

    get() {
        return database.query("SELECT * FROM cup")
    }


    async getById(id) {
        const rows = await database.query('SELECT * FROM cup WHERE cupNo = ?', [id])
        return rows[0]
    }

    async getByOvitrapID(id) {
        const rows = await database.query('SELECT * FROM cup where ovitrapID = ?', [id])
        return rows
    }

    create(cup, ovitrapID) {
        return database.query('INSERT INTO cup (address,marker,longitude,latitude,ovitrapID) VALUES (?,?,?,?,?)', [cup.address, cup.marker, cup.longitude, cup.latitude, ovitrapID])
    }

    delete(id) {
        return database.query('DELETE FROM cup WHERE cupNo = ? ', [id])
    }

    update(id, cup) {
        const fields = []
        const params = []

        for (const attribute in cup) {
            fields.push('?? = ?')
            params.push(attribute, cup[attribute])
        }

        const stmt = `UPDATE cup SET ${fields.join(', ')} WHERE cupNo = ?`
        return database.query(stmt, [...params, parseInt(id)])
    }
}

module.exports = new CupModel
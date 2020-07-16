const database = require('../database')

class ReportModel {

    constructor() {
        if (this.instance) return this.instance
        ReportModel.instance = this
    }

    get() {
        return database.query("SELECT * FROM report")
    }


    async getById(id) {
        const rows = await database.query('SELECT * FROM report WHERE id = ?', [id])
        return rows[0]
    }

    create(report) {
        return database.query('INSERT INTO report (patientName,address,ic,age,dateReported) VALUES (?,?,?,?,?)', [report.patientName, report.address, report.ic, report.age, report.dateReported])
    }

    delete(id) {
        return database.query('DELETE FROM report WHERE id = ? ', [id])
    }

    update(id, report) {
        const fields = []
        const params = []

        for (const attribute in report) {
            fields.push('?? = ?')
            params.push(attribute, report[attribute])
        }

        const stmt = `UPDATE report SET ${fields.join(', ')} WHERE id = ?`
        return database.query(stmt, [...params, parseInt(id)])
    }
}

module.exports = new ReportModel
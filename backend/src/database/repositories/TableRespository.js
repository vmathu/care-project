const { TableModel } = require('../models');

class TableRepository  {
    async addTable({id_shop, type}) {
        try {
            const table = new TableModel({id_shop, type});
            const result = await table.save();
            return result;
        } catch (err) {
            console.log('TableRepository.addTable', err);
        }
    }

    async getAllTables() {
        try {
            const tables = await TableModel.find();
            return tables;
        } catch (err) {
            console.log('TableRepository.getAllTables', err);
        }
    }
}

module.exports = TableRepository;
const initOptions = {
    capSQL: true
};
const pgp = require('pg-promise')(initOptions);
const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 30 // use up to 30 connections
}

const db = pgp(cn);

module.exports = schema => {
    this.schema = schema;

    return {
        // CHECK CONNECTION
        checkConnection: async () => {
            const connection = await db.connect();
            try {
                await connection.any('SELECT 1');
                console.log('Database connected successfully');
                return true;
            } catch (error) {
                console.error('Database connection failed:', error.message || error);
                console.error(error.stack);  
            } finally {
                connection.done();  
            }
        },
        // GET ALL
        all: async tbName => {
            try {
                const data = await db.any(`SELECT * FROM "${this.schema}"."${tbName}"`);
                return data;
            } catch (error) {
                throw error;
            }
        },
        // GET ONE
        one: async (tbName, idField, id) => {
            try {
                const table = new pgp.helpers.TableName({ table: tbName, schema: this.schema });
                const data = await db.oneOrNone(`SELECT * FROM ${table} WHERE "${idField}"=$1`, id);
                return data;
            } catch (error) {
                throw error;
            }
        },
        // ADD ONE
        add: async (tbName, entity) => {
            try {
                const table = new pgp.helpers.TableName({ table: tbName, schema: this.schema });
                const sql = pgp.helpers.insert(entity, null, table);
                console.log(`${sql} RETURNING id`);
                const rs = await db.oneOrNone(`${sql} RETURNING *`);
                return rs;
            } catch (error) {
                throw error;
            }
        },
        // UPDATE
        update: async (tbName, entity, idField, id) => {
            try {
                const table = new pgp.helpers.TableName({ table: tbName, schema: this.schema });
                const set = pgp.helpers.update(entity, null, table);
                const sql = `${set} WHERE "${idField}" = $1 RETURNING *`;
                const updatedEntity = await db.oneOrNone(sql, [id]);
                return updatedEntity;
            } catch (error) {
                throw error;
            }
        },
        // DELETE 
        deleteByField: async (tbName, fieldName, value) => {
            try {
                const table = new pgp.helpers.TableName({ table: tbName, schema: this.schema });
                const sql = `DELETE FROM ${table} WHERE "${fieldName}" = $1 RETURNING *`;
                const deletedRecords = await db.any(sql, [value]);
                return deletedRecords;
            } catch (error) {
                throw error;
            }
        },
        // GET ALL BY FIELD
        allByField: async (tbName, fieldName, value) => {
            try {
                const table = new pgp.helpers.TableName({ table: tbName, schema: this.schema });
                const data = await db.any(`SELECT * FROM ${table} WHERE "${fieldName}" = $1`, value);
                return data;
            } catch (error) {
                throw error;
            }
        }
    }
}

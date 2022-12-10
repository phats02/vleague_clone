const pgp = require('pg-promise')();
const cn = 'postgres://postgres:quangphat@localhost:5432/User';
const db = pgp(cn);

module.exports={
    getAll:async (tableName)=>{
        const table = new pgp.helpers.TableName({ table: tableName });
        const rs=await db.any('select * from $1',table)
        return rs
    },
    insert:async (tableName,entity)=>{ 
        const query=pgp.helpers.insert(entity,null,tableName) +"RETURNING *"
        const rs=await db.one(query)
        return rs
    },
    getOne:async (tableName,columnName,value)=>{
        const table = new pgp.helpers.TableName({table: tableName});
        const column = new pgp.helpers.TableName({table: columnName});
        const rs=await db.oneOrNone('select * from $1 where $1.$2=$3',[table,column,value])
        return rs
    },
    query: async(queryString)=>{
        const rs=await db.any(queryString)
        return rs
    },
    delete:async (tableName,columnName,value)=>{
        const table = new pgp.helpers.TableName({table: tableName});
        const column = new pgp.helpers.TableName({table: columnName});
        const rs=await db.oneOrNone('DELETE FROM $1 WHERE $2=$3 RETURNING $3',[table,column,value])
        return rs
    },
}
import connection from "../connection.js";


class CatagoryService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject ) => {
            connection.getConnection().query('select * from category', (err, list) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(list)
                }
            })
        })
    }


  
}

export default new CatagoryService();

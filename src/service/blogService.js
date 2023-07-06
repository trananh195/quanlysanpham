import connection from "../connection.js";


class BlogService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject ) => {
            let sql = `select blog.id, title, content, category.name 
            from demo2006.blog
            join category on idCategory = category.id`
            connection.getConnection().query(sql, (err, list) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(list)
                }
            })
        })
    }

    save(blogs) {
        return new Promise((resolve, reject ) => {
            let sql = `INSERT INTO demo2006.blog (title, content, idCategory) VALUES ('${blogs.title}', '${blogs.content}','${blogs.category}');`
    
            connection.getConnection().query(sql, (err, rs) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rs)
                }
            })
        })
    }

    findById(id) {
        return new Promise((resolve, reject ) => {
            connection.getConnection().query(`select * from blog where id = ${id}`, (err, blogs) => {
                if (err) {
                    reject(err)
                } else {                   
                    resolve(blogs[0])
                }
            })
        })
    }
    }

    

  


export default new BlogService();

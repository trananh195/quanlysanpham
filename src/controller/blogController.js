import fs from "fs";
import qs from "qs";
import url from "url";
import blogService from "../service/blogService.js";
import catagoryService from "../service/catagoryService.js";

class BlogController {

    showAll(req, res) {
        fs.readFile('view/blog/list.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            blogService.findAll().then((blogs)=> {
                // console.log(blogs)
                for (const item of blogs) {
                    str+=`<h3>${item.id}, ${item.title}, ${item.content}, ${item.name} <button><a href="/edit-product?idEdit=${blogs.id}">Edit</a></button><button><a href="/delete-product?idDel=${blogs.id}">Delete</a></button></h3>`
                }
                stringHTML = stringHTML.replace('{list}', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }


    add(req, res){
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'GET') {
                fs.readFile('view/blog/add.html', 'utf-8', (err, stringHTML) =>{
                    catagoryService.findAll().then(categories =>{
                        let str = '';
                        for(const item of categories){
                            str += ` <option value="${item.id}">${item.name}</option>`
                        }
                        stringHTML= stringHTML.replace('{listCategory}', str)
                        res.write(stringHTML);
                        res.end();
                    })
                
                })
            } else {
                data = qs.parse(data);
                // console.log(data);
                blogService.save(data).then(()=>{
                    res.writeHead (301,{'location':'/blogs'})
                    res.end();
                })
                              
            }
        })
        
    }

    edit(){
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end',  () => {
            if (req.method === 'GET') {
                let urlObject = url.parse(req.url, true);
                blogService.findById(urlObject.query.idEdit).then((blog)=>{
                    stringHTML = stringHTML.replace('{id}', blog.title)
                    stringHTML = stringHTML.replace('{name}', blog.content)
                    let str = '';
                        for(const item of categories){
                            str += ` <option value="${item.id}">${item.name}</option>`
                        }
                        stringHTML= stringHTML.replace('{listCategory}', str)
                        res.write(stringHTML);
                        res.end();
                })
                
                fs.readFile('view/blog/edit.html', 'utf-8', (err, stringHTML) =>{
                    catagoryService.findAll().then(categories =>{
                        
                    })
                
                })
            } else {
                data = qs.parse(data);
                blogService.save(data).then(()=>{
                    res.writeHead (301,{'location':'/blogs'})
                    res.end();
                })
                              
            }
        })
    }
   
}

function showList(req, res) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        productService.findAll().then((products)=> {
            for (const product of products) {
                str+=`<h3>${product.name} <button><a href="/edit-product?idEdit=${product.id}">Edit</a></button><button><a href="/delete-product?idDel=${product.id}">Delete</a></button></h3>`
            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new BlogController();

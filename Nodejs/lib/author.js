var template = require('./template.js');
var db = require('./db');
var sanitizeHtml = require('sanitize-html');
var bodyParser = require('body-parser'); //express에 내장

app.use(bodyParser.urlencoded({extended: false})); //body-parser middleware

exports.home = function(request,response) {
    db.query(`SELECT * FROM topic`,function(error,topics) {
        db.query(`SELECT * FROM author`,function(error2,authors) {
            var title = 'author';
            var list = template.list(topics);
            var html = template.HTML(title, list,
                `
                ${template.authorTable(authors)}                
                <style>
                    table {
                        border-collapse: collapse;
                    }
                    td {
                        border:1px solid black;
                    }
                </style>
                <form action="/author/create_process" method="post">
                    <p> 
                        <input type="text" name="name" placeholder="name">
                    </p>
                    <p>
                        <textarea name="profile" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit" value="create">
                    </p>                
                </form>
                `,
                ''
                );
            response.send(html);    
            });
        });
}
exports.create_process = function(request,response) {
    var post = request.body;
    db.query(`INSERT INTO author (name, profile) VALUES (?,?)`, 
    [post.name,post.profile],
    function (error,result) {
        if(error)
            throw error;
    response.redirect(302, '/author');
    })
}
exports.update = function(request,response) {
    db.query(`SELECT * FROM topic`,function(error,topics) {
        db.query(`SELECT * FROM author`,function(error2,authors) {
            db.query(`SELECT * FROM author WHERE id=?`, [request.params.authorId],function(error3,author) {
                var title = 'author';
                var list = template.list(topics);
                var html = template.HTML(title, list,
                    `
                    ${template.authorTable(authors)}                
                    <style>
                        table {
                            border-collapse: collapse;
                        }
                        td {
                            border:1px solid black;
                        }
                    </style>
                    <form action="/author/update_process" method="post">
                        <p>
                            <input type="hidden" name="id" value="${request.params.authorId}">
                        </p>
                        <p> 
                            <input type="text" name="name" placeholder="name" value="${sanitizeHtml(author[0].name)}">
                        </p>
                        <p>
                            <textarea name="profile" placeholder="description">${sanitizeHtml(author[0].profile)}</textarea>
                        </p>
                        <p>
                            <input type="submit" value="update">
                        </p>                
                    </form>
                    `,
                    ''
                    );
                response.send(html);    
                });
            });
        });
}
exports.update_process = function(request,response) {
    var post = request.body;
    db.query(`UPDATE author SET name=?, profile=? WHERE id=?`, 
    [post.name,post.profile,post.id],
    function (error,result) {
        if(error)
            throw error;
        response.redirect(302,'/author');
    })
}
exports.delete_process = function(request,response) {
    var post = request.body;
    db.query(`
    DELETE FROM topic WHERE author_id=?`,
    [post.id],
    function(error1, result1) {
        if(error1)
            throw(error1);
        db.query(`
            DELETE FROM author WHERE id=?`, 
            [post.id],
            function (error2,result2) {
                if(error2)
                    throw error2;
                response.redirect(302,'/author');
        })
    });
}
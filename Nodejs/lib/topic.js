var template = require('./template.js');
var db = require('./db');
var sanitizeHtml = require('sanitize-html'); // npm install -S sanitize-html
var bodyParser = require('body-parser'); //express에 내장

exports.home = function(request, response) {
    db.query(`SELECT * from topic`,function(error,topics) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(topics);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
      );
    response.send(html);
  });
};
exports.page = function(request, response) {
    db.query(`SELECT * FROM topic`,function(error,topics) {
        if(error) {
          throw error;
        }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[request.params.pageId],function(error2,topic) {
         if(error2) {
           throw error2;
         }
         var title = topic[0].title;
         var description = topic[0].description;
         var list = template.list(topics);
         var html = template.HTML(title, list,
           `<h2>${sanitizeHtml(title)}</h2>
           ${sanitizeHtml(description)}
           <p>by ${sanitizeHtml(topic[0].name)}</p>
           `,
           `<a href="/create">create</a> 
             <a href="/update/${request.params.pageId}">update</a>
             <form action="/delete_process" method="post">
               <input type="hidden" name="id" value="${request.params.pageId}">
               <input type="submit" value="delete">
             </form>`
           );
         response.send(html);
       })
     });
}
exports.create = function(request,response) {
    db.query(`SELECT * FROM topic`,function(error,topics) {
        if (error)
         throw error;
        db.query(`SELECT * FROM author`,function(error2, authors) {
          if (error2)
           throw error2;
         var title = 'Create';
         var list = template.list(topics);
         var html = template.HTML(sanitizeHtml(title), list, 
           `
             <form action="/create_process" method="post">
             <p><input type="text" name="title" placeholder="title"></p>
             <p>
               <textarea name="description" placeholder="description"></textarea>
             </p>
             <p>
               ${template.authorSelect(authors)}
             </p>
             <p>
               <input type="submit">
             </p>
           </form>
           `,
           `<a href="/create"> create</a>`
         );
         response.send(html);
         });
     });
}
exports.create_process = function(request,response) {
  var post = request.body;
  db.query(`INSERT INTO topic (title, description,created,author_id) VALUES (?,?,NOW(),?)`, 
    [post.title,post.description,post.author],
    function (error,result) {
      if(error)
        throw error;
      response.redirect(302, `/page/${result.insertId}`);
    })
}
exports.update = function(request,response) {
    db.query(`SELECT * FROM topic`,function(error,topics) {
        if (error)
          throw error;
        db.query(`SELECT * FROM topic WHERE id=?`, [request.params.pageId], function(error2,topic) {
          if (error2)
            throw error2;
          db.query(`SELECT * FROM author`,function(error, authors) {
            var title = 'Update';
            var list = template.list(topics);
            var html = template.HTML(sanitizeHtml(topic[0].title), list, 
              `
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${topic[0].id}">
                <p><input type="text" name="title" placeholder="title" value="${sanitizeHtml(topic[0].title)}"></p>
                <p>
                  <textarea name="description" placeholder="description"> ${sanitizeHtml(topic[0].description)}</textarea>
                </p>
                <p>
                  ${template.authorSelect(authors, topic[0].author_id)}
                </p>
                <p>
                  <input type="submit">
                </p>
            </form>
            `, 
              `<a href="/create">create</a> <a href="/update/${topic[0].id}">update </a>`
              );
            response.send(html);
          });
        });
      });
}
exports.update_process = function(request,response) {
  var post = request.body;
  db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`, [post.title, post.description, post.author, post.id], function (error,result) {
      if(error)
        throw error;
      response.redirect(302,`/page/${post.id}`);
    });
}
exports.delete_process = function(request,response) {
  var post = request.body;
  var id = post.id;
  db.query(`DELETE FROM topic WHERE id=?`, [id], function (error,result) {
  if(error)
    throw error;
  response.redirect(302,'/');
});
}
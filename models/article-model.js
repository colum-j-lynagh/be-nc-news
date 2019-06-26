const connection = require('../db/connection');

exports.fetchArticle = article_id => {
  return connection
    .first('articles.*')
    .from('articles')
    .join('comments', 'articles.article_id', '=', 'comments.article_id')
    .where('articles.article_id', '=', article_id)
    .count('comments.comment_id as comment_count')
    .groupBy('articles.article_id', 'comments.article_id');
};

exports.updatedVotes = (article_id, desiredUpdateTotal) => {
  return connection
    .first('*')
    .from('articles')
    .where('article_id', '=', article_id)
    .increment({ votes: desiredUpdateTotal })
    .returning('*')
    .then(([article]) => article);
};

exports.addComment = newComment => {
  return connection
    .into('comments')
    .insert(newComment)
    .returning('*')
    .then(([comment]) => comment);
};

exports.fetchComments = (article_id, { sort_by, order }) => {
  return connection
    .select('*')
    .from('comments')
    .where('comments.article_id', '=', article_id)
    .orderBy(sort_by || 'created_at', order || 'desc');
};

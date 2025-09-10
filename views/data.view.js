exports.successList = (rows) => rows.map(r => ({
  id: r.id,
  title: r.title,
  content: r.content,
  created_by: r.created_by,
}));

exports.successOne = (row) => ({
  id: row.id,
  title: row.title,
  content: row.content,
  created_by: row.created_by,
});

const createTable = (table) => {
  const query = `CREATE TABLE ${table};`;
  return query;
};

module.exports = {
  createTable: createTable,
};

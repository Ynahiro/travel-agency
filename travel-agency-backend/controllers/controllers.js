class Controller {
  constructor(tableName) {
    this.tableName = tableName;
  }

  selectALLRows() {
    return `SELECT * FROM ${this.tableName}`;
  }

  selectById(id) {
    return `SELECT * FROM ${this.tableName} WHERE [Id] = ${id}`;
  }

  selectByColumn(columnName, value) {
    return `SELECT * FROM ${this.tableName} WHERE ${columnName} = '${value}'`
  }
}

export default Controller;
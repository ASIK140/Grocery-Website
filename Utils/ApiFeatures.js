class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["Keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // for price
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  //Pagination
  Pagination(ResultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = ResultPerPage * (currentPage - 1);
    this.query = this.query.limit(ResultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;

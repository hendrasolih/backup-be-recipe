const searchModel = require("../models/searchRecipes");
const form = require("../Helpers/form");

module.exports = {
  searchRecipes: (req, res) => {
    const { query } = req;

    const limit = Number(query.limit) || 10; // default 10

    const page = Number(query.page) || 1;

    const offset = (page - 1) * limit;

    const { title } = req.query;
    let plusQuery = ``;
    let uriQuery = ``;
    let queryLength = Object.keys(req.query).length;
    if (query.page) {
      queryLength -= 1;
    }
    if (query.limit) {
      queryLength -= 1;
    }

    console.log(queryLength, title);

    if (queryLength) {
      if (req.query.title) {
        plusQuery += ` WHERE title_rcp LIKE '%${req.query.title}%' `;
        uriQuery += `title_rcp='${title}'`;
      }
    }
    console.log(
      "a" + plusQuery,
      "b" + uriQuery,
      "d" + page,
      "e" + offset,
      "f" + limit
    );
    console.log(searchModel);
    searchModel
      .searchTotalResult(plusQuery)
      .then((result) => {
        searchModel
          .searchRecipes(
            plusQuery,
            uriQuery,
            result[0].total_result,
            page,
            offset,
            limit
          )
          .then((data) => {
            res.status(200).json(data);
          })
          .catch(() => {
            res.status(404).json({
              msg: `${title} not found`,
            });
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

'use strict';

const Category = require('../models/category');

const Categories = {

    addCategory: {
        handler: async function (request, h)
        {
            try
            {
                const data = request.payload;
                const newCategory = new Category({
                    name: data.name,
                });
                await newCategory.save();
                return h.redirect("/home");
            } catch (err) {
                return h.view("main", { errors: [{ message: err.message }]
                });
            }
        }
    },

}

module.exports = Categories;
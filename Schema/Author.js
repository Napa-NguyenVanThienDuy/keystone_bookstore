const { keystone } = require("..");

const { Text, Relationship } = require("@keystonejs/fields");

const Author = {
  access: {
    create: ({ authentication: { item } }) => {
      return item && item.role ? item.role === "Admin" : false;
    },
    update: ({ authentication: { item } }) => {
      return item && item.role ? item.role === "Admin" : false;
    },
    delete: ({ authentication: { item } }) => {
      return item && item.role ? item.role === "Admin" : false;
    },
  },
  fields: {
    name: { type: Text, isRequired: true },
    books: { type: Relationship, ref: "Book.author", many: true },
  },
};

module.exports = {
  Author,
};

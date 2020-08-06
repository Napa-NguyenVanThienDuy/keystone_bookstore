const { Select, Text, Relationship } = require("@keystonejs/fields");

const Category = {
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
    description: { type: Text },
    books: {
      type: Relationship,
      ref: "Book.category",
      many: true,
    },
  },
};

module.exports = {
  Category,
};

const {
  Text,
  CloudinaryImage,
  Integer,
  CalendarDay,
  Relationship,
} = require("@keystonejs/fields");

const { CloudinaryAdapter } = require("@keystonejs/file-adapters");

// const modulex = require("./name-module");
const fileAdapter = new CloudinaryAdapter({
  cloudName: "dkhnpanxa",
  apiKey: "572657261681586",
  apiSecret: "FxyL1b_TDnnc79lLFRH0cSf5mqk",
  folder: "bookstore",
});

const Book = {
  access: {
    create: ({ authentication: { item } }) => {
      return item && item.role
        ? item.role === "Admin" || item.role === "Manager"
        : false;
    },
    update: ({ authentication: { item } }) => {
      return item && item.role
        ? item.role === "Admin" || item.role === "Manager"
        : false;
    },
    delete: ({ authentication: { item } }) => {
      return item && item.role ? item.role === "Admin" : false;
    },
  },
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    category: {
      type: Relationship,
      ref: "Category.books",
      many: true,
      isRequired: true,
    },
    author: {
      type: Relationship,
      ref: "Author.books",
      isRequired: true,
      many: false,
    },
    image: {
      type: CloudinaryImage,
      adapter: fileAdapter,
    },
    pageNumber: {
      type: Integer,
    },
    numberInStore: {
      type: Integer,
    },
    publishDate: {
      type: CalendarDay,
      defaultValue: new Date().toISOString("DD-MM-YYYY").substring(0, 10), //Today's date
    },
    describe: {
      type: Text,
    },
  },
};
//This table will have some field included books information like:
//name, category, author, image, page number, number in storage, publish date, describe.
module.exports = {
  Book,
};

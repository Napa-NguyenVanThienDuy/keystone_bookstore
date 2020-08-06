const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

const { Book } = require("./Schema/Book.js");
const { Author } = require("./Schema/Author.js");
const { Category } = require("./Schema/Category.js");
const { User } = require("./Schema/User.js");

const PROJECT_NAME = "bookstore";
const adapterConfig = {
  dropDatabase: false,
  knexOptions: {
    connection: "postgres://postgres:admin@localhost:5432/bookstore",
  },
};

/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control a~nd authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
});
console.log(Book);
keystone.createList("Book", Book);
keystone.createList("Author", Author);
keystone.createList("Category", Category);
keystone.createList("User", User);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    identityField: "username",
    secretField: "password",
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};

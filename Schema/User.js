const { Text, Password, Select } = require("@keystonejs/fields");

const roles = ["Admin", "Manager"];

const User = {
  access: {
    read: ({ authentication: { item } }) => {
      //When user not authentication.
      if (!item) {
        return false;
      }
      //Only Admin can filter all user account.
      if (item && item.role === "Admin") {
        return {};
      } else {
        return {
          id: item.id,
        };
      }
    },
    // create: ({ authentication: { item } }) => {
    //   return item && item.role ? item.role === "Admin" : false;
    // },
    update: ({ authentication: { item } }) => {
      return item && item.role ? item.role === "Admin" : false;
    },
    delete: ({ authentication: { item } }) => {
      return item && item.role ? item.role === "Admin" : false;
    },
  },
  fields: {
    username: { type: Text, isRequired: true, isUnique: true },
    password: { type: Password, isRequired: true, minLength: 4 },
    role: { type: Select, options: roles, isRequired: true },
  },
  labelField: "username",
};

module.exports = {
  User,
};

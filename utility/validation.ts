export default class validator {
  static register = (must = true) => ({
    username: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });

  static login = (must = true) => ({
    username: {
      presence: must,
      type: "string",
    },
    password: {
      presence: must,
      type: "string",
    },
  });

  static category = (must = true) => ({
    name: {
      presence: must,
      type: "string",
    },
  });
}

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 72],
    "header-case": [2, "always", "lower-case"],
    "scope-empty": [1, "never"],
    "scope-case": [1, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-case": [2, "always", "lower-case"],
    "type-case": [1, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "chore",
        "docs",
        "feat",
        "fix",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};

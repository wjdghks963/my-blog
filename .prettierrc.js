module.exports = {
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@types/(.*)$",
    "^@utils/(.*)$",
    "^@libs/(.*)$",
    "^@public/(.*)$",
    "^@components/(.*)$",
    "^@base/(.*)$",
    "^@common/(.*)$",
    "^@styles/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  printWidth: 120,
  singleAttributePerLine: true,
};

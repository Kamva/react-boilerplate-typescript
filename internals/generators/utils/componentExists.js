/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
const pageComponents = fs.readdirSync(
  path.join(__dirname, '../../../app/components'),
);
const pageContainers = fs.readdirSync(
  path.join(__dirname, '../../../app/containers'),
);

const modules = fs.readdirSync(path.join(__dirname, '../../../app/module'));
const page = fs.readdirSync(path.join(__dirname, '../../../app/page'));
const components = pageComponents
  .concat(pageContainers)
  .concat(modules)
  .concat(page);

function componentExists(comp) {
  return components.indexOf(comp) >= 0;
}

module.exports = componentExists;

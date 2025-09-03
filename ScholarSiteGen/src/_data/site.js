const yaml = require('js-yaml');
const fs = require('fs');

module.exports = function() {
  const siteConfig = yaml.load(fs.readFileSync('./content/site.yaml', 'utf8'));
  return {
    ...siteConfig,
    buildTime: new Date().toISOString(),
    year: new Date().getFullYear()
  };
};
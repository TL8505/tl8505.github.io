const fs = require('fs');
const path = require('path');
const { Cite } = require('@citation-js/core');
require('@citation-js/plugin-bibtex');

module.exports = function() {
  let publications = [];
  
  // Try to load from JSON first
  try {
    const jsonPath = path.join(process.cwd(), 'content/publications.json');
    if (fs.existsSync(jsonPath)) {
      const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      publications = jsonData;
    }
  } catch (error) {
    console.warn('Could not load publications.json:', error.message);
  }
  
  // Try to load from BibTeX if JSON is empty
  if (publications.length === 0) {
    try {
      const bibPath = path.join(process.cwd(), 'content/publications.bib');
      if (fs.existsSync(bibPath)) {
        const bibContent = fs.readFileSync(bibPath, 'utf8');
        const cite = new Cite(bibContent);
        const bibData = cite.get({ format: 'object' });
        
        publications = bibData.map(item => ({
          title: item.title || '',
          authors: item.author ? item.author.map(a => `${a.given} ${a.family}`).join(', ') : '',
          venue: item['container-title'] || item.journal || item.booktitle || '',
          year: item.issued ? item.issued['date-parts'][0][0] : '',
          type: item.type || 'article',
          doi: item.DOI || '',
          url: item.URL || '',
          abstract: item.abstract || '',
          tags: item.keyword ? item.keyword.split(/[,;]/).map(k => k.trim()) : [],
          citation: {
            bibtex: cite.get({ format: 'bibtex' })
          }
        }));
      }
    } catch (error) {
      console.warn('Could not load publications.bib:', error.message);
    }
  }
  
  return publications.sort((a, b) => b.year - a.year);
};
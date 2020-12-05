const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const table = require('markdown-table');
const stringWidth = require('string-width');

const parseCsv = (path) => {
  const csv = fs.readFileSync(path);
  const data = parse(csv, {
    columns: true,
  });
  return data;
};

const sort = (data) => {
  data.sort((a, b) => {
    if (
      a.published_at > b.published_at ||
      (a.published_at === b.published_at && a.title < b.title)
    ) {
      return -1;
    }
    if (
      a.published_at < b.published_at ||
      (a.published_at === b.published_at && a.title > b.title)
    ) {
      return 1;
    }
    return 0;
  });
  return data;
};

const makeTable = (data) => {
  const a = [['title', 'author', 'published_at']];
  data.forEach((e) => {
    let title = e.title;
    if (e.url !== '') {
      title = `[${e.title}](${e.url})`;
    }
    let author = e.author;
    if (e.author_url !== '') {
      author = `[${e.author}](${e.author_url})`;
    }
    a.push([title, author, e.published_at]);
  });
  return table(a, { stringLength: stringWidth });
};

console.log(makeTable(sort(parseCsv(`${__dirname}/data.csv`))));

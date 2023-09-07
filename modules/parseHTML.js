export const parseHTML = data => {
  const headersTags = ['<h1', '<h2', '<h3', '<h4', '<h5', '<h6'];
  console.log('Вывод заголовков:');

  let posHeader = 0;
  let lastPosHeader = 0;
  let numHeader = 0;
  for (let i = 0; i < headersTags.length; i++) {
    while (
      (posHeader = data.indexOf(headersTags[i], posHeader + 1)) !== -1 &&
      (lastPosHeader = data.indexOf(`${headersTags[i].slice(1)}>`, lastPosHeader + 1)) !== -1
    ) {
      numHeader++;
      console.log(`${numHeader} ${data.substring(posHeader, lastPosHeader + 3)}`);
    }
  }
  console.log();

  const linksTag = '<a';
  console.log('Вывод ссылок:');

  let posLinkTag = 0;
  let lastPosLinkTag = 0;
  let numLink = 0;
  while (
    (posLinkTag = data.indexOf(linksTag, posLinkTag + 1)) !== -1 &&
    (lastPosLinkTag = data.indexOf(`${linksTag.slice(1)}>`, lastPosLinkTag + 1)) !== -1
  ) {
    numLink++;
    console.log(`${numLink} ${data.substring(posLinkTag, lastPosLinkTag + 2)}`);
  }
};

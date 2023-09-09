export const showNews = data => {
  const news = JSON.parse(data).articles;

  if (news?.length) {
    news.forEach(article => {
      console.log(article);
    });
  } else {
    console.log('По Вашему запросу новостей не найдено');
  }
};

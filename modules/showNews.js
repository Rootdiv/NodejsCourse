export const showNews = data => {
  const news = JSON.parse(data).articles;

  if (news === undefined) {
    console.log('Ошибка запроса: неверный ключ');
  } else if (news.length) {
    news.forEach(article => {
      console.log(article);
    });
  } else {
    console.log('По Вашему запросу новостей не найдено');
  }
};

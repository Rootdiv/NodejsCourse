#!/usr/bin/env node

import process from 'node:process';
import { argsParse } from './util/argsParse.js';
import { getNews } from './modules/getNews.js';

const app = () => {
  const args = argsParse(process.argv);
  const languages = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud', 'zh'];
  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  const query = {
    pageSize: 10,
  };

  if (args.h || args.help) {
    console.log(`
      -h --help | список команд (игнор других команд)
      -q        | поиск новостей по ключевым словам
      -l        | выбор языка новостей
      -с        | выбор категории новостей (опционально)
      -s        | количество новостей на странице (опционально)
    `);
    return;
  }

  if (Object.keys(args).length === 0) {
    //Если опций не указано включаем обязательный параметр и выводим новости;
    query.country = 'ru';
    getNews(query);
    return;
  }

  //Если есть опции проверяем являются ли они обязательными и корректность значений;
  if (args.q || (args.l && args['l']?.length === 2)) {
    if (languages.includes(args.l)) {
      query.language = args.l;
    }
    if (args['q']?.length > 0) {
      query.q = args.q;
    }
  } else {
    console.log(`Необходимо указать один из доступных языков: ${languages.join(', ')} или указать поисковый запрос.`);
    return;
  }

  //Проверяем необязательные параметры;
  if (args.c) {
    if (categories.includes(args.c)) {
      query.category = args.c;
    } else {
      console.log(`Необходимо указать одну из доступных категорий: ${categories.join(', ')}`);
      return;
    }
  }

  //Проверяем необязательные параметры;
  if (args.s) {
    if (!isNaN(args.s) || +args.s <= 100) {
      query.pageSize = args.s;
    } else {
      console.log('Количество новостей не число или больше 100');
      return;
    }
  }

  getNews(query);
};

app();

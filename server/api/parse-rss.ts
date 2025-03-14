import {defineEventHandler} from 'h3';
import Parser from 'rss-parser';
const parser = new Parser();
export default defineEventHandler(async (event) => {
    const feedUrl = 'https://lenta.ru/rss';
    return await parser.parseURL(feedUrl);
});
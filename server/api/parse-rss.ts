import {defineEventHandler} from 'h3';
import Parser from 'rss-parser';
const parser = new Parser();
export default defineEventHandler(async (event) => {
    const mosRuRssUrl = 'https://www.mos.ru/rss';
    const lentRuRssUrl = 'https://lenta.ru/rss';

    try {
        const mosRuFeed = await parser.parseURL(mosRuRssUrl);
        const lentRuFeed = await parser.parseURL(lentRuRssUrl);
        return {
            mosRuNews: mosRuFeed.items,
            lentRuNews: lentRuFeed.items,
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: 'Ошибка при получении новостей',
        });
    }
});
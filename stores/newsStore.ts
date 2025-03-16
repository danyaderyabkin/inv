import {defineStore} from "pinia";
import type {NewsItem} from "~/types/newsItem";

export const useNews = defineStore('news', () => {
    const newsMosList = ref<any[]>([])
    const newsLentList = ref<any[]>([])
    const newsList = ref<any[] | null>(null)
    const initMosNewsList = (news:any[]) => newsMosList.value = news
    const initLentNewsList = (news:any[]) => newsLentList.value = news
    const initMainArrayNews = ():NewsItem[] => {
        newsList.value = [...newsMosList.value, ...newsLentList.value]
        return newsList.value = newsList.value.map((el) => {
            return {
                title: el.title ? el.title : '',
                description: el.contentSnippet ? el.contentSnippet : el.title,
                link: el.link ? el.link : '',
                image: el.enclosure.url ? el.enclosure.url : '',
                pubDate: el.pubDate ? el.pubDate : '',
                category: el.link.includes('mos.ru') ? 1 : 2,
                categoryName: el.link.includes('mos.ru') ? 'mos.ru' : 'lenta.ru'
            }
        })
    }

    return {newsMosList, newsLentList, newsList, initMosNewsList, initLentNewsList, initMainArrayNews}
})
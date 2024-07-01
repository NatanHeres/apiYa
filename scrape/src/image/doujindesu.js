const { chromium } = require('playwright');

async function doujindesulastest() {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    const page = await context.newPage();
    await page.goto('https://doujindesu.tv');
    await page.waitForLoadState('load');

    const data = await page.$$eval('.entries .entry', entries => {
        const results = [];
        entries.forEach(entry => {
            const dataTags = entry.getAttribute('data-tags');
            const anchor = entry.querySelector('a');
            const href = anchor ? 'https://doujindesu.tv' + anchor.getAttribute('href') : null;
            const title = anchor ? anchor.getAttribute('title') : null;
            const img = entry.querySelector('img');
            const imgSrc = img ? img.getAttribute('src') : null;
            results.push({ 
              Creator: 'Seks_AhAhAh',
              Tags: dataTags, 
              url: href, 
              Title: title, 
              ThumbnailUrl: imgSrc 
            });
        });
        return results;
    });

    await browser.close();
    return data;
}



async function doujindesusearch(q) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    const page = await context.newPage();
    await page.goto(`https://doujindesu.tv/?s=${q}`);
    await page.waitForLoadState('load');

    const baseUrl = 'https://doujindesu.tv';
    const entries = await page.$$eval('.entries .entry', (articles, baseUrl) => {
        return articles.map(article => {
            let dataTags = article.getAttribute('data-tags');
            if (dataTags) {
                dataTags = dataTags.replace(/\|/g, ',');
            }
            const href = article.querySelector('a')?.getAttribute('href');
            const title = article.querySelector('a')?.getAttribute('title');
            const imgSrc = article.querySelector('.thumbnail img')?.getAttribute('src');
            return { 
                Tags: dataTags, 
                Url: href ? baseUrl + href : null, 
                Title: title, 
                ThumbnailUrl: imgSrc 
            };
        });
    }, baseUrl);

    await browser.close();
    return entries;
}



async function doujindesudetail(url) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, seperti Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    const page = await context.newPage();
    await page.goto(`https://doujindesu.tv/manga/${url}`);
    await page.waitForLoadState('load');

    const chapters = await page.$$eval('div.epsright', elements => {
        return elements.map(element => {
            const chapterElement = element.querySelector('a');
            const dateElement = element.nextElementSibling.querySelector('span.date');
            const downloadElement = element.parentElement.querySelector('span.linkdl a');

            return {
                href: chapterElement ? chapterElement.href : null,
                chapter: chapterElement ? chapterElement.innerText : null,
                date: dateElement ? dateElement.innerText : null,
                downloadLink: downloadElement ? downloadElement.href : null
            };
        });
    });

    await browser.close();
    return chapters;
}

module.exports = {
        doujindesulastest,
        doujindesusearch,
        doujindesudetail
      }
const request = require("request");
const cheerio = require('cheerio');

 export const fetchArticle = (url) => {
     const opt = {
         url: "https://api.scraperapi.com?api_key=b31ab839825f8ce6746e7163b0586c9f&url=" + url,
         headers: {
            'content-type': 'text/html; charset=ISO-8859-1'
         }
     }
     return new Promise((resolve, reject)  => {
         request(opt,
             (error, response, html) => {
                 if(!error && response.statusCode === 200) {
                     const $ = cheerio.load(html);

                     const title = $('meta[property="og:title"]').attr('content');
                     const imageURL = $('meta[property="og:image"]').attr('content');
                     const description = $('meta[property="og:description"]').attr('content');

                     resolve({
                         title,
                         imageURL,
                         description
                     });
                 }
             });
     });
}
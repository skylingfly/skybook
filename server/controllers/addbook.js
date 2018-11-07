// 新增图书
// 1. 获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
// 2. 存储数据库
const https = require('https')
const { mysql } = require('../qcloud')
module.exports = async (ctx, next) => {
    const {isbn, openid} = ctx.request.body
    if (isbn && openid) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        const url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookInfo = await getBookData(url)
        const rate = bookInfo.rating.average
        const {title, image, alt, publisher, summary, price} = bookInfo
        const tags = bookInfo.tags.map(v => `${v.title} ${v.count}`).join(',')
        const author = bookInfo.author.join(',')
        try {
            await mysql('books').insert({
                isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author
            })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败：' + e.sqlMessage
                }
            }
        }
    }
}

function getBookData (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urldata = ''
            res.on('data', data => {
                urldata += data
            })
            res.on('end', data => {
                const bookInfo = JSON.parse(urldata)
                console.log(bookInfo)
                if (bookInfo.title) {
                    resolve(bookInfo)
                } else {
                    reject(bookInfo)
                }
            })
        })
    })
}

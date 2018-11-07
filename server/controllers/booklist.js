const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { page, size, openid } = ctx.request.query // get请求

    const booksmysql = mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .orderBy('books.id', 'desc')
    let books
    if (openid) {
        books = await booksmysql.where('books.openid', openid)
    } else {
        books = await booksmysql.limit(size).offset(Number(page - 1) * Number(size))
    }
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}

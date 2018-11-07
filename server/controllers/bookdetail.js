const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const {id} = ctx.request.query
    const detail = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .where('id', id)
        .first()
    const info = JSON.parse(detail.user_info)
    const tags = detail.tags.split(',')
    const summary = detail.summary.split('\n')
    ctx.state.data = Object.assign({}, detail, {
        tags,
        summary,
        user_info: {
            name: info.nickName,
            image: info.avatarUrl
        }
    })
    await mysql('books')
        .where('id', id)
        .increment('count', 1)
}

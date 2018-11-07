const { mysql } = require('../qcloud')
module.exports = async (ctx, next) => {
    const { bookid, openid } = ctx.request.query
    const listmysql = mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
        .orderBy('comments.id', 'desc')
    let list
    if (bookid) {
        list = await listmysql.where('bookid', bookid)
    } else if (openid) {
        list = await listmysql.where('openid', openid)
    }
    ctx.state.data = {
        list: list.map(v => {
            const info = JSON.parse(v.user_info)
            const data = Object.assign({}, v, {name: info.nickName, image: info.avatarUrl})
            return data
        })
    }
}

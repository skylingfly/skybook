const { mysql } = require('../qcloud')
module.exports = async (ctx, next) => {
    const {openid, bookid, comment, phone, location} = ctx.request.body
    try {
        await mysql('comments')
            .insert({openid, bookid, comment, phone, location})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (error) {
        ctx.state = {
            code: -1,
            data: {
                msg: '评论添加失败' + error.sqlMessage
            }
        }
    }
}

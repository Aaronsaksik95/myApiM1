module.exports = {
    stripe: {
        key: process.env.SECRET_KEY_STRIPE,
        vue_url: process.env.VUE_APP_URL,
        webhook_secret: process.env.WEBHOOK_SECRET
    }
}
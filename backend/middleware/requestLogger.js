function requestLogger(req, res, next) {
    console.log(`[REQ] ${req.method} ${req.url}`)
    next()
}

export default requestLogger
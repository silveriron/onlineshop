const inputDataLoad = (req) => {
    const inputData = req.session.data
    req.session.data = ''
    return inputData

}

const inputDataSessionSave = (req, data, action) => {
    req.session.data = data
    req.session.save(action)
}

module.exports = {
    inputDataLoad: inputDataLoad,
    inputDataSessionSave: inputDataSessionSave,
}
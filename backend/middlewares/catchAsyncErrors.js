module.exports = (theFunc) =>  (req, res, next) =>{
    // promise is javascript pre built class
    Promise.resolve(theFunc(req, res, next)).catch(next)
}
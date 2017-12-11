module.exports = function ( delay ) {
  return new Promise ( function ( fulfill ) {
    setTimeout( fulfill, delay )
  })
}

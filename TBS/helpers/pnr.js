import num from 'crypto-random-string'

const pnr = num({length:5,type:'numeric'})

module.exports= pnr
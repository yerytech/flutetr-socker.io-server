
const crypto = require('crypto');

function generateUniqueId(length) {
  // Genera bytes aleatorios
  const randomBytes = crypto.randomBytes(length);
  
  // Convierte los bytes a una representación hexadecimal
  const uniqueId = randomBytes.toString('hex');
  
  return uniqueId;
}


class Band {

    constructor(name = 'no-mane') {
        
        this.id = generateUniqueId(9);
        this.name = name;
        this.votes = 0;
    }
}


module.exports =Band;
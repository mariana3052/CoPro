const bcrypt= require('bcryptjs');
const helpers= {};

helpers.encryptPassword = async (Contrasena) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await  bcrypt.hash(Contrasena, salt);
    return hash;
};

helpers.matchPassword = async (Contrasena, savepassword) => {
    try {
        return await bcrypt.compare(Contrasena, savepassword);
    }
    catch(e) {
        console.log(e);
    }
};

module.exports = helpers;
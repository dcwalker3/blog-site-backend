const User = require('../Models/user.model');

function addUser(user){

    const newUser = new User({
        email: user.email,
    });
    newUser.setPassword(user.password);

    newUser.save((err, user) => {
        if(err){
            console.log(err);
            return Promise.reject(err);
        }
        return Promise.resolve(user);
        });
}

function changePassword(id, password){
    return User.findById(id)
    .then(user => {
        if(!user){
            return Promise.reject('User not found');
        }
        user.setPassword(password);
        return user.save();
    });
}


function changeEmail(id, email){
    return User.findById(id)
    .then(user => {
        if(!user){
            return Promise.reject('User not found');
        }
        user.email = email;
        return user.save();
    });
}


function getUser(email){
    return User.findOne({email: email})
    .then(user => {
        if(!user){
            return Promise.reject('User not found');
        }
        return Promise.resolve(user);
    });
}


function deleteUser(id){
    return User.findByIdAndRemove(id, (err, user) => {
        if(err){
            console.log(err);
            return Promise.reject(err);
        } else {
            return Promise.resolve(user);
        }
    });
}




module.exports = {
    addUser,
    changePassword,
    changeEmail,
    getUser,
    deleteUser,
}
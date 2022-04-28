const User = require('../Models/user.model');

function addUser(email, password, Callback){

    const newUser = new User({
        email: email,
    });
    newUser.setPassword(password);

    newUser.save((err, user) => {
        if(err){
            if(err.code === 11000){
                Callback("User already exists");
            } else {
                console.log(err);
                Callback("Unable to add user");
            }
        }
        Callback(true);
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


function signOut(email, Callback){
    
}




module.exports = {
    addUser,
    changePassword,
    changeEmail,
    getUser,
    deleteUser,
}
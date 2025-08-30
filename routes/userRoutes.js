const express = require('express');
const router = express.Router();
const user = require('./../models/user');
const  {jwtAuthmiddleware,generatetoken} = require('./../jwt')


router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        
        // Check if trying to create admin
        if (data.role === 'admin') {
            const existingAdmin = await user.findOne({ role: 'admin' });
            if (existingAdmin) {
                return res.status(400).json({
                    error: 'Admin already exists. Only one admin is allowed.'
                });
            }
        }
        
        // Check if nagritaCardNumber already exists
        const existingUser = await user.findOne({ nagritaCardNumber: data.nagritaCardNumber });
        if (existingUser) {
            return res.status(400).json({
                error: 'User with this nagarita card number already exists.'
            });
        }
        
        // Create new user
        const newUser = new user(data);
        const response = await newUser.save();

        const payload = {
            id: response.id,
        }
        console.log(payload);
        
        const token = generatetoken(payload);

        console.log('token:', token);
        console.log('Data saved:', response);
        console.log('data received:', data);
        
        res.status(200).json({
            success: true,
            message: `${response.role} created successfully`,
            response: response,
            token: token
        });
        
    } catch (err) {
        console.error('Error saving data:', err);
        
        // Handle mongoose duplicate key error
        if (err.code === 11000) {
            return res.status(400).json({
                error: 'Nagarita card number already exists'
            });
        }
        
        res.status(500).json({ error: 'Internal server error' });
    }
});


// creating a login
router.post('/login', async (req,res)=>{
    try{
        const { nagritacardNumber, password } = req.body;

        // find the user by username
        const user = await Person.findOne({ nagritacardNumber: nagritacardNumber });

        // if user doesn't exist or password doesn't match
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // payload for token
        const payload = {
            id: user.id,
        };

        // generate token
        const token = generatetoken(payload);

        // send response
        return res.status(200).json({ 
            message: "Login successful", 
            token: token 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/profile',async(req,res)=>{
    try {
        const userdata = req.user;
        console.log("user data:",userdata);

        const userId = userdata.id;
        const user = await Person.findById(userId)
        res.status(200).json(user);
    } catch (error) {
         console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})





router.put('/profile/password', async(req,res)=>{
    try{
           const userid = req.user;
           const {currentPassword,newPassword}= req.body;

           const user = await user.findById(userid);
             

          if(!await user.comparePassword(currentPassword)){
            return res.status(401).json({error:'invalid username or password'})
          }

        //   update user password 
          user.password = newPassword;
          await user.save();

          console.log('password is updated');
          res.status(200).json({message:'the pasword is updated'});

    }catch(err){
            console.log(err);
            res.status(500).json({error :' internal server error '})
    }
    }
)

//  creating delete option 



module.exports = router;
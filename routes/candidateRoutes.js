const express = require('express');
const User = require('../models/user')
const router = express.Router();
const candidate = require('./../models/candidate');
const  {jwtAuthmiddleware, generatetoken} = require('./../jwt');
const { json } = require('body-parser');
const Candidate = require('./../models/candidate');

const checkAdminRole = async (userId) => {
    try{
        const user = await User.findById(userId);
        return user.role === 'admin';
    }catch(error){
        return false; // Return false if error occurs
    }
}

// POST - Create candidate
router.post('/', jwtAuthmiddleware, async (req, res) => {
    try {
        // Fix: Add await here
        if(!(await checkAdminRole(req.user.id))){
            return res.status(403).json({message:'User does not have admin role'});
        }
        
        const data = req.body;
        const newCandidate = new candidate(data);
        const response = await newCandidate.save();
        
        console.log('Data saved:', response);
        console.log('Data received:', data);
        
        // Fix: Remove token or generate it properly
        res.status(200).json({
            success: true,
            response: response
            // Remove token line since it's not needed for candidate creation
        });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT - Update candidate
router.put('/:candidateid', jwtAuthmiddleware, async(req,res) => {
    try{
        if(!(await checkAdminRole(req.user.id))){
            return res.status(403).json({message:'User does not have admin role'});
        }

        const candidateid = req.params.candidateid;
        const updatedCandidateData = req.body;

        const response = await candidate.findByIdAndUpdate(candidateid, updatedCandidateData, {
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error:'Candidate not found'})
        }

        console.log('Data is updated');
        res.status(200).json({
            success: true,
            response: response
        });

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

// DELETE - Delete candidate (Fix: Change to DELETE method)
router.delete('/:candidateid', jwtAuthmiddleware, async(req,res) => {
    try{
        if(!(await checkAdminRole(req.user.id))){
            return res.status(403).json({message:'User does not have admin role'});
        }

        const candidateid = req.params.candidateid;
        const response = await candidate.findByIdAndDelete(candidateid)

        if(!response){
            return res.status(404).json({error:'Candidate not found'})
        }

        console.log('Candidate deleted');
        res.status(200).json({
            success: true,
            message: 'Candidate deleted successfully',
            response: response
        });

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})



router.post('/vote/:candidateId', jwtAuthmiddleware, async (req, res) => {
    const candidateId = req.params.candidateId; // from URL
    const userId = req.user.id;     
    
    // checking if candidate id exist or not 
    try {
        const candidate = await Candidate.findById(candidateId);
        if(!candidate){
            res.status(404).json({error:'the candidate is not found '});
        }
        //  checking if the user data exist 
        const user = await User.findById(userId);
        if(!user){
            res.status(404).json({error:'the user is not found'})
        }
        if(user.isvoted){
            res.status(400).json({error:' u have already voted '})
        }
        if(user.role =='admin'){
            res.status(403).json({error:'admin is not applicable to vote '})
        }

        candidate.votes.push({user:userId});
        candidate.voteCount++;
        await candidate.save();

        //  update the user document
        user.isvoted=true;
        user.save();

        res.status(200).json({message:'vote recoreded sucessfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
});

// vote count 

router.get('/vote/count',async (req,res)=>{
   try {
     const candidate = await Candidate.find().sort({voteCount:'desc'});
    //  map the candidate to  only return their partyname and votecount
         const voteRecord = candidate.map((data)=>{
            return {
                party:data.party,
                count: data.voteCount
            }
         }) ;
         return res.status(200).json(voteRecord)

   } catch (error) {
      console.log(error);
        res.status(500).json({error: 'Internal server error'})
   }
    });

    //  to get he list of the candidates 

router.get('/candidatelist',async(req,res)=>{
    try{
        const candidatelist = await Candidate.find();
        if(!candidatelist){
            res.status(404).json({error:'the data is empty'});
        }

        res.status(200).json(candidatelist)
    }catch(error){
          console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
})





module.exports = router;
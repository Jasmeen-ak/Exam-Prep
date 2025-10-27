const Examinee = require('../models/Examinee')
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{
    const {email} = req.body//email validation for duplication
    const ex = await Examinee.findOne({email:email})
    if(ex)
    {
        return res.json({message:"Details Alredy Exists"})
    }
    const user = await new Examinee(req.body);
    user.save();
    return res.json("Registered Succesfully");
})

router.get('/',async(req,res)=>{
    const user= await Examinee.find();
    return res.json(user)
})
router.put('/:id',async(req,res)=>{
    const{id} = req.params;
    const user = await Examinee.findByIdAndUpdate(id,req.body);
    return res.json("Updated Successfully")
})
router.delete('/:id',async(req,res)=>{
    const {id} = req.params
    const user = await Examinee.findByIdAndDelete(id);
    return res.json("Deleted Successfully")
})

router.get('/',async(req,res)=>{
    const {id} = req.params
    const user = await Examinee.findById(id);
    return res.json(user)
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    const user = await Examinee.findOne({email:email});
    if(!user){
        return res.status(400).json("User not found")
    }
    if(user.password == password){
        return res.status(200).json({message:"Login Successfully",user:{
          email:user.email,
          id:user._id,
          role:"user"
        }})
    }
    else{
        return res.json({message:"Password Not Matched"})
    }
})

router.put('/change/:id',async(req,res)=>{
    const {op,np,cnp} = req.body
    const{id} = req.params;
    const user = await Examinee.findById(req.params.id);
    if(!user){
        return res.json({message:"Details not matched"})
    }
    if(user.password==op){
      if(op==np){
        return res.json({message:"Your Old and New Password are same"})
      }
      else if(np==cnp){
         try{
            const ex = await Examinee.findByIdAndUpdate(id,{password:cnp});
            return res.json({message:"Password Updated Successfully"});
         }
         catch(er)
         {
            console.log(er)
            return res.json({message:"Sorry try again"})
         }
      }
    }else{
        return res.json({message:"Your Old Password did not match"})

    }
})

// Update an exam status after completion
router.put('/:id/exam/:id', async (req, res) => {
  const { id, examIndex } = req.params;
  const { status, subject } = req.body; // status = "Passed" / "Failed"

  try {
    const examinee = await Examinee.findById(id);
    if (!examinee) return res.status(404).json({ message: "User not found" });

    // If examIndex is valid, update it. Otherwise, add a new one.
    if (examinee.exams[examIndex]) {
      examinee.exams[examIndex].status = status;
      examinee.exams[examIndex].subject = subject || examinee.exams[examIndex].subject;
    } else {
      examinee.exams.push({ subject, status });
    }

    await examinee.save();
    return res.json({ message: "Exam status updated", exams: examinee.exams });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating exam status" });
  }
});



// 


module.exports = router;
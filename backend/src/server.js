import express from 'express';
import { MongoClient} from 'mongodb';
const app=express();
app.get('/hello',async(req,res)=>{
    try{
        const client=await MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true});
        const db=client.db('my-table');
       // const data=[];
        await db.collection("tables").find({}).toArray(function(err,result){
            if (err) throw err;
            res.status(200).json(result);
        });
        
        client.close();
    }
    catch(error){
        res.status(500).json({message:'Something Went Wrong',error})
     }
})
app.listen(8000,()=>console.log("listening on port 8000"));
const express = require("express");
const router = express.Router();


let items=[
    {name:'pen', price: 20,id:1},
    {name:'pencil', price:5, id:2}
]
router
    .route("")
    .get((req,res)=>{
        return res.send(items)
    })
    .post((req,res,next)=>{
        let temp=req.body;
        let maxId = items.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id);
        let success =false;
        for(i=0;i<temp.length;i++){
           // console.log(temp[i]);
           temp[i].id=++maxId;
           items.push(temp[i]);
            success=true;
        }
        if(success)
        return  res.send('success')
        else{
            const error=new Error('something went wrong ');
            error.status=500;
            return next(error);
        }
    })

router
    .route("/:id")
    .get((req,res,next)=>{
        let item = items.find(val => val.id === Number(req.params.id));
        if(item!=null)
        item={ ...item, id: undefined };
        else{
            const error=new Error('no item found with id:'+req.params.id);
            error.status=404;
            return next(error);
        }
    return res.json(item);
    })
    .patch((req, res,next) => {
        const item = items.find(val => val.id === Number(req.params.id));
        
       if(item){
        if(req.body.name){
            item.name = req.body.name;
        }
        if(req.body.price){
            item.price = req.body.price;
        }
       }
       else{
        const error=new Error('no item found with id:'+req.params.id);
            error.status=404;
            return next(error);
       }
      
        return res.json({ message: "Updated" });
      })
      .delete((req, res,next) => {
        const itemIndex = items.findIndex(val => val.id === Number(req.params.id));
        if(itemIndex>=0){
            items.splice(itemIndex, 1);
        return res.json({ message: "Deleted" });
        }
        else{
            const error=new Error('no item found with id:'+req.params.id);
            error.status=404;
            return next(error);
        }
        
      });

module.exports = router;
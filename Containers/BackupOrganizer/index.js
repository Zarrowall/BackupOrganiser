import backupManager from './src/BackupManager.js';
import CollectionManager from './src/CollectionManager.js';
import express from "express";
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;
const bakMan = new backupManager();
const colMan = new CollectionManager();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get("/api/Overview",(req,res)=>{
    res.json(colMan.overviewJson());
});

app.get("/api/List",(req,res)=>{
    res.json(colMan.detailOverviewJson());
});

app.get("/api/Info",(req,res)=>{
    if(req.query.name === undefined){
        let errorMsg = JSON.stringify({Error : `Cannot find ${req.query.name} in collections`});
        res.status(404).json(errorMsg);
        return
    };
    res.send(colMan.infoJson(req.query.name));
})
app.get("/api/Search",(req,res)=>{
    console.log(colMan.search(req.query.name))
    res.send(colMan.search(req.query.name));
})
app.put("/api/Edit",(req,res)=>{
    const {name,newMod,newFlag} = req.body;
    let localName = colMan.get(name);
    if(!name||!newMod||!newFlag){
        res.status(400).send()
        return
    };
    if(localName === null){
        res.status(400).send()
        return
    };
    res.json(colMan.edit(req.body.name,req.body.newMod,req.body.newFlag))
    res.status(200).send()
})
app.delete("/api/Delete",(req,res) =>{
    res.json(colMan.remove(req.query.name))
})
app.delete("/api/Unbackup",(req,res) =>{
    res.json(colMan.unBackup(req.query.name,req.query.bakName))
})

app.post("/api/Collection",(req,res)=>{
    const {name,desc,creationDate,modified,stillUpdated} = req.body;
    let localName = colMan.get(req.body.name);
    if(!name||!creationDate||!modified||stillUpdated===undefined){
        res.status(400).send()
        return
    };
    if(!localName){
        colMan.add_collection(req.body.name,
        req.body.desc,
        req.body.creationDate,
        req.body.modified,
        req.body.stillUpdated);
        res.status(201).send()
        return
    }
    else{
       res.status(409).send(`Error: Name:"${req.body.name}" conflicts with an existing Collection`)
    }
})

app.post("/api/Backup",(req,res)=>{
    const {name,bakName,date,location} = req.body;
    let localName = colMan.get(name);
    if(!name||!bakName||!date||!location){
        res.status(400).send()
        return
    };
    if(localName === null){
        res.status(400).send()
        return
    };
    bakMan.addBackup(localName,
    req.body.bakName,
    req.body.date,
    req.body.location);
    res.status(201).send();
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
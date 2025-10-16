import CollectionManager from "./CollectionManager.js";
import backupManager from "./BackupManager.js";
import dataCollection from "./DataCollection.js";
function main(){
    const colMan = new CollectionManager();
    const backMan = new backupManager();
    const dataMan = new dataCollection()
    colMan.add_collection("Collection 1","First Collection","2025","2026",true)
    colMan.add_collection("Collection 2","2nd Collection","2011","2031",false)
    colMan.add_collection("Collection 3","3rd Collection","2012","2032",true)

    backMan.addBackup(colMan.get("Collection 1"),"Hej","April 2012","home")
    backMan.addBackup(colMan.get("Collection 1"),"Hdsa"," 1012","aaae")
    backMan.addBackup(colMan.get("Collection 1"),"awawa","20132","heee")
    // console.log(colMan.detailOverview())
    // console.log(colMan.overviewJson())
    // console.log(colMan.detailOverviewJson())
    console.log(colMan.info("Collection 1"))
    // console.log(colMan.get("Collection 1").backupEntries)
    // console.log(colMan.get("Collection 1").fullJson())
}
main();
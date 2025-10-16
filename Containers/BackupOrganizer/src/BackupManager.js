import dataCollection from "./DataCollection.js";

class backupManager{
    /**
     * Pushes a backup list into the backupentries list for the dataCollection object
     * @param {dataCollection} collectionObject 
     * @param {string} backupName 
     * @param {string} backupCreationDate 
     * @param {string} backupLocation 
     * @returns {dataCollection}
     */
    addBackup = (collectionObject,backupName,backupCreationDate,backupLocation) =>{
        if (collectionObject  === null){
            return"Error: None existent object";
        };
        collectionObject.addBackup(backupName,backupCreationDate,backupLocation);
    }
}
export default backupManager;
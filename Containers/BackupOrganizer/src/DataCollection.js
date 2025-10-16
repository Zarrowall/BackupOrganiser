import backup_entry from "./BackupEntry.js"

class dataCollection{
    constructor(name,desc = "",creationDate,modified,stillUpdated){
        this.name = name
        this.desc = desc
        this.creationDate = creationDate
        this.modified = modified
        this.stillUpdated = stillUpdated
        this.backupEntries = []
    }
/**
 * Creates an detailed list based on the obj information and appends backup entry data onto it
 * @returns {string[]}
 */
    fullStr = () =>{
        const fullDetails = [`Name:${this.name}`,`Description:${this.desc}`,`Created:${this.creationDate}`,`Latest mod:${this.modified}`,`Up to date:${this.stillUpdated}`];
        for (let entry of this.backupEntries){
            if (this.backupEntries.length <= 0){
                return fullDetails;
            }
            fullDetails.push(`backupName:${entry.name}`,`created:${entry.date}`, `location:${entry.location}`);
        };
        return fullDetails;
    }
    /**
     * Pushes a new backupEntry onto this obj backupentry list
     * @param {string} backupName 
     * @param {string} backupCreationDate 
     * @param {string} backupLocation 
     */
    addBackup = (backupName,backupCreationDate,backupLocation) =>{
        this.backupEntries.push(new backup_entry(backupName,backupCreationDate,backupLocation));
    };

    fullJson = () =>{
        return {
            name : this.name, 
            description : this.desc,
            creationDate : this.creationDate,
            modified : this.modified,
            stillUpdated : this.stillUpdated,
            backupEntries : this.backupEntries.map((attr)=>({
                bakName: attr.name,
                date : attr.date,
                location : attr.location
            }))
        }
    } ;
    
    shortJson= ()=> {
        return{
            name : this.name,
            creationDate : this.creationDate
        }
    }
};
export default dataCollection
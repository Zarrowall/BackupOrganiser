import { json } from 'express';
import dataCollection from './DataCollection.js';


class CollectionManager{
     constructor(){
        this.dataCollections = [];
    };
/**
 * Creates and add a Collection
 * @param {string} name 
 * @param {string} desc 
 * @param {string} creationDate 
 * @param {string} modified 
 * @param {Boolean} stillUpdated
 * @returns {dataCollection}
 */
    add_collection = (name,desc,creationDate,modified,stillUpdated) => {
        let newDc = new dataCollection(name,desc,creationDate,modified,stillUpdated);
        this.dataCollections.push(newDc);
    };
/**
 * Returns a rudimentary attribute list containing obj name and latest modified
 * @returns {string[]}
 */
    overview = () => {
        const dataCol = this.dataCollections;
        const attrList = [];
        for (let dc of dataCol){
            attrList.push(`Name:${dc.name} | Latest mod:${dc.modified}`);
        };
        return attrList;
    };
/**
 * returns an rudimentary attribute list containing obj name and modified in json format
 * @returns {JSON} 
 */
    overviewJson = () => {
        const dataCol = this.dataCollections
        const res = []
        for(let dc of dataCol){
            res.push(dc.fullJson())
        }
        return res;
    }
/**
 * Returns a Detailed attribute list containing all of its attributes
 * @returns {string[]}
 */
    detailOverview = () => {
        const dataCol = this.dataCollections;
        const attrList = [];
        for(let dc of dataCol){
            attrList.push(`Name:${dc.name} | Description:${dc.desc}
            Created:${dc.creationDate} | Latest mod:${dc.modified} | Up to date:${dc.stillUpdated}`);
        }
        return attrList;
    }
/**
 * Returns a Detailed attribute list containing all of its attributes in json format
 * @returns {JSON}
 */
     detailOverviewJson = () => {
        const dataCol = this.dataCollections
        const res = []
        for(let dc of dataCol){
            res.push(dc.fullJson())
        }
        return res;
    }
/**
 * Fetches information based on user input, if the input is null returns an ERROR
 * @param {string} collectionName 
 * @returns {string[]}
 */
    info = (collectionName) =>{
        const collection = this.get(collectionName);
        if (collection === null){
            return "Error: None existent entry";
        };
        const fullStr = collection.fullStr();
        return fullStr;
    };
    infoJson = (collectionName) =>{
        const collection = this.get(collectionName);
         if (collection === null){
            return "Error: None existent entry";
        };
        return collection.fullJson();
    }
/**
 * Fetches the correct collection based on user input
 * @param {string} collectionName 
 * @returns {string}
 */
    get = (collectionName) =>{
        const dataCol = this.dataCollections
        for(let dc of dataCol){
            if(dc.name !== collectionName){
                continue;
            };
            return dc;
        }
        return null;
    }

    search = (partSearch) =>{
        const dataCol = this.dataCollections;
        const localList = []
        for(let dc of dataCol){
            console.log(dc)
            if(dc.name.includes(partSearch)){
                // localList.push({name:dc.name,modified:dc.modified});
                localList.push(dc.fullJson())
            }
            continue
        }
        return localList;
    }
    edit = (collectionName,newMod,newFlag)=>{
        const collection = this.get(collectionName);
        collection.modified = newMod
        collection.stillUpdated = newFlag
        return collection
    }
    remove = (collectionName)=>{
        let dataCol = this.dataCollections.filter(collections => collections.name !== collectionName)
        this.dataCollections = dataCol
        return this.dataCollections
    }
    unBackup = (collectionName,bakName) =>{
        let dataCol = this.get(collectionName)
        let collection = dataCol.backupEntries.filter(backup => backup.name !== bakName)
        dataCol.backupEntries = collection
        return dataCol
    }
};
export default CollectionManager
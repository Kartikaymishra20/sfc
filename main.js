#!/usr/bin/env node
let inputArr=process.argv.slice(2);
const { FORMERR } = require("dns");
let fs=require("fs");
const { type } = require("os");
let path=require("path");
//console.log(inputArr);
let command=inputArr[0];
let types ={
    media: ["mp4","mkv"],
    archives: ['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents: ['docx','doc','pdf','xlsx','xlx','odt','odp','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg','deb']
}
switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please Input Right command");
        break;
}

function treeFn(dirpath){
    console.log("tree command implemented for",dirpath);
    let destPath;
    if(destPath==undefined) {
        
        treeHelper(process.cwd(),"");
        return;
    } else {
        let doesExist=fs.existsSync(dirPath);
        if(doesExist) {
          treeHelper(dirPath,"");
        }else {
            console.log("kindly enter the correct path");
        }
    }
}
function treeHelper(dirPath,indent) {
  let isFile=  fs.lstatSync(dirPath).isFile();
  if(isFile==true) {
   let fileName= path.basename(dirPath);
   console.log(indent+"___"+fileName);
  }else {
    let dirName=path.basename(dirPath)
console.log(indent+"---"+dirName);
let childrens =fs.readdirSync(dirPath);
for(let i=0;i<childrens.length;i++){
    let childPath=path.join(dirPath,childrens[i]);
    treeHelper(childPath,indent+"\t");
}
  }
}
function organizeFn(dirPath){
    //console.log("organize command implemented for",dirpath);
    let destPath;
    if(dirPath==undefined){
        destPath=process.cwd();
        return;
    } else {
     let doesExist = fs.existsSync(dirpath);
     if(doesExist){
       destPath = path.join(dirPath,"organized_files");
      if(fs.existsSync(destPath)==false){
      fs.mkdirSync(destPath);}
     } else {
        console.log("kindlhy entern the correct path");
     }
    }
    organizeHelper(dirPath,destPath);
}
function organizerHelper(src,dest) {
   let childNames = fs.readdirSync(src);
   //console.log(childNames);
   for(let i=0;i<childNames.length;i++){
  let childAddress =  path.join(src,childNames[i]);
  fs.lstatSync(childAddress).isFile();
  if(isFile) {
    console.log(childNames[i]);
   let category = getcategory(childNames[i]);
   console.log(childNames[i],"belongs to-->",category);
   sendFiles(childAddress,dest,category);
  }
   }
}
   function sendFiles(srcFilePath,dest,category){
    let categorypath=path.join(dest,category);
    if(fs.existsSync(categorypath)==false)
    fs.mkdirSync(categorypath);
   
   let fileName=path.basename(srcFilePath);
   let destFilePath= path.join(categorypath,fileName);
   fs.copyFileSync(srcFilePath,destFilePath);
   fs.unlinkSync(srcFilePath);
   console.log(fileName,"copied to",category);
}
function getcategory(name) {
  let ext=  path.extname(name);
  ext=ext.slice(1);
  for(let typt in types){
   let cTypeArray= types[type];
   for(let i=0;i<cTypeArray.length;i++){
    if(ext==cTypeArray[i]){
        return type;
    }
   }
  }
  return "others";
}
function helpFn() {
    console.log(`
    List of all the commands:
     node main.js tree "directoryPath"   
      node main.js organize" directoryPath"       
    node main.js help         `);
}
    
          
    
    




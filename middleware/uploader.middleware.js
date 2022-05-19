const multer = require("multer");
const myStorage = multer.diskStorage({
    destination: (req,file,cd)=>{
        cd(null,'uploads');
    },
    filename: (req,file,cd)=>{
        let file_name= Date.now()+"-"+file.originalname;
        cd(null,file_name);
    }
})

const imageFilter = (req,file,cd)=>{
    //validation 
    if(file.mimetype.includes("image/")){
        cd(null,true);
    }
    else{
        cd(null,false);
    }
    /*
     let filename = file.originalname.split(".");;
     let ext = filename[filename.length-1];
     let allowed = ['jpeg','jpg','png','webp','bnp','svg'];
     if(ext.includes(allowed)){
         cd(null,true);
     }
     else{
         cd(null,false)
     }
     */

}
const upload=multer({
    // dest:"uploads"
    storage: myStorage,
    fileFilter: imageFilter

})


module.exports= upload;
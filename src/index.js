console.log("Hello welcome to online stores");
const buildApp =require("./app.js");
const env=require("./config");
const startApp=async()=>{

    const app = await buildApp();
    
    app.listen(env.port || 4000,()=>{

        console.log("app is runing: "+env.port || 4000);
        console.log("env: "+env.db.database);

    }).setTimeout(0)
   


}
startApp();
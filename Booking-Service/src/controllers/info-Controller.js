const info=(req,res)=>{
    return res.json({
        sucess: "ok",
        message: "Api is Live",
        error:{},
        data: {}
    })
}

module.exports ={
    info
}
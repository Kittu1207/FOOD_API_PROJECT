const testUserController=(req,res)=>{
    try {
        res.status(200).send('<h1>Test User Controller is working</h1>');
    } catch (error) {
        console.log(error);

    }
};



module.exports={testUserController};
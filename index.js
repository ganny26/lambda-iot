const AWS = require('aws-sdk');
const config = require('./configs/config');
const express = require('express');
const bodyParser = require('body-parser');

AWS.config.update({
    accessKeyId: config.accessKeyId || process.env.access_key_id,
    secretAccessKey: config.secretAccessKey || process.env.secret_access_key,
    region: config.region
});


const app = express();
const Lambda = new AWS.Lambda();

const AWS_LAMBDA_FUNCTION_NAME = "generateName"

const pullParams = {
    FunctionName: AWS_LAMBDA_FUNCTION_NAME,
    InvocationType: 'RequestResponse',
    LogType: 'None'
};



app.get('/',(req,res)=>{
    Lambda.invoke(pullParams, function (error, data) {
        if (error) {
            res.send({
                "status":false,
                "result":error
            })
        } else {
            let result = JSON.parse(data.Payload);
            res.send({
                "status":true,
                "result":result
            })
        }
    });
})


app.listen(config.port,(req,res)=>{
    console.log(`app running on ${config.port}`);
})


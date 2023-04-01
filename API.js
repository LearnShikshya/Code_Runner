const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors({
    origin: 'file:///Users/prithakadhikari/Code_Runner/index.htm'
}));

const bodyP = require("body-parser");
const compiler = require("compilex");
const options = {stats: true};
compiler.init(options)
app.use(bodyP.json());
app.use("/codemirror-5.65.12", express.static("/Users/prithakadhikari/Code_Runner/codemirror-5.65.12"));
app.get("/", function(req, res){
    res.sendFile("/Users/prithakadhikari/Code_Runner/index.htm");
});

app.post("/compile", function(req, res) {
    var code = req.body.code;
    var input = req.body.input;
    console.log(input);

    if (input == undefined) {
    var envData = { OS : "macos" , cmd : "gcc", options:{timeout:1000} }; // ( uses gcc command to compile )
    compiler.compileCPP(envData , code , function (data) {
        res.send(data);
    });
    } else {
        var envData = { OS : "macos" , cmd : "gcc", options:{timeout:1000} }; // ( uses gcc command to compile )
        compiler.compileCPPWithInput(envData , code , input, function (data) {
            res.send(data);
        }); 
    }
})

app.listen(8000);
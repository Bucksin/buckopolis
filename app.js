const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());

app.use("/dist/", express.static("./dist"));
app.use("/css/", express.static("./dist/css"));
app.use("/img/", express.static("./dist/img"));
app.use("/mdl/", express.static("./dist/mdl"));
app.use("/src/", express.static("./src"));

//root route//
app.get("/", function (req, res) {
    let indexPage = fs.readFileSync("./dist/index.html", "utf8");
    res.send(indexPage);
    })
    
    let port = 8000;
    app.listen(process.env.PORT || port, function (err) {
        console.log("Server is running on port " + port);
        if (err)
            console.log(err);
    })
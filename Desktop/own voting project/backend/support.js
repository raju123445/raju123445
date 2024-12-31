const conn = require("../connection");

exports.support=(req,res)=>{
    const {name,email,message} = req.body;
    const query ="INSERT INTO support(name, Email, message) VALUES(? , ? , ? )"
    conn.query(query , [name,email,message] , (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
            res.status(500).send("Failed to insert data.");
        } else {
            console.log("Data successfully inserted");
            res.send(`
                <script>
                    alert("Thank you for message");
                    window.location='/';
                </script>`);
            
        }
    })
}
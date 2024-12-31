const conn = require("../connection");

exports.messages = (req, res) => {
    var query = "SELECT * FROM support";
    conn.query(query, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error fetching candidates");
        } else {
            // console.table(results);
            res.render("a_message_display", { support: results }); // Render the vote page
        }
    });
};
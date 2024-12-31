// const conn = require("../connection");
// exports.user_reg = (req, res) => {
//     const { voter_id, voter_name, email, dob, aadhar_no, password } = req.body;

//     const query = "INSERT INTO users (voter_id, votername, email, registration_date, aadhar_no, password) VALUES (?, ?, ?, ? , ?, ?)";
//     conn.query(query, [voter_id, voter_name, email , dob , aadhar_no, password], (error, result) => {
//         if (error) {
//             console.error("Error inserting data:", error);
//             res.status(500).send("Failed to insert data.");
//         } else {
//             console.log("Data successfully inserted");
//             res.send(`<script>
//                     alert("You are Successfully registered");
//                     window.location.href = "/";
//                 </script>`);
//         }
//     });
// };

// // exports

const conn = require("../connection");

exports.user_reg = (req, res) => {
    const { voter_id, voter_name, email, dob, aadhar_no, password, fingerprint_data } = req.body;

    const query = `
        INSERT INTO users (voter_id, votername, email, registration_date, aadhar_no, password, fingerprint)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    conn.query(query, [voter_id, voter_name, email, dob, aadhar_no, password, fingerprint_data], (error, result) => {
        if (error) {
            console.error("Error inserting data:", error);
            res.status(500).send("Failed to insert data.Email Exists");
        } else {
            console.log("Data successfully inserted");
            res.send(`<script>
                alert("You are Successfully registered");
                window.location.href = "/";
            </script>`);
        }
    });
};

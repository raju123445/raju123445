// const conn = require("../connection");

// exports.see_result = (req, res) => {
//     var query = "SELECT * FROM votes";
//     conn.query(query, (error, results) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send("Error fetching candidates");
//         } else {
//             res.render("a_see_result", { votes: results }); // Render the vote page
//         }
//     });
// };


// const conn = require("../connection");

// exports.see_result = (req, res) => {
//     const queryVotes = "SELECT * FROM votes";
//     const queryWinner = `
//         SELECT candidate_id, COUNT(*) AS votes
//         FROM votes
//         GROUP BY candidate_id
//         ORDER BY votes DESC
//         LIMIT 1
//     `;

//     conn.query(queryVotes, (error, results) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send("Error fetching votes");
//         } else {
//             conn.query(queryWinner, (err, winnerResult) => {
//                 if (err) {
//                     console.log(err);
//                     res.status(500).send("Error calculating winner");
//                 } else {
//                     const winner = winnerResult.length > 0 ? winnerResult[0] : null;
//                     res.render("a_see_result", {
//                         votes: results,
//                         winner: winner, // Pass the winner data
//                     });
//                 }
//             });
//         }
//     });
// };

const conn = require("../connection");

exports.see_result = (req, res) => {
    // Query to fetch all votes and candidate names
    const queryVotes = `
        SELECT v.*, c.name AS candidate_name 
        FROM Votes v
        JOIN Candidates c ON v.candidate_id = c.candidate_id
    `;

    // Query to fetch the winner (candidate with the highest votes)
    // const queryWinner = `
    //     SELECT c.name AS candidate_name, v.candidate_id, COUNT(*) AS votes
    //     FROM Votes v
    //     JOIN Candidates c ON v.candidate_id = c.candidate_id
    //     GROUP BY v.candidate_id, c.name
    //     ORDER BY votes DESC
    //     LIMIT 1
    //`;

    const queryWinner = `
    SELECT c.name AS name, v.candidate_id, COUNT(*) AS votes
    FROM Votes v
    JOIN Candidates c ON v.candidate_id = c.candidate_id
    GROUP BY v.candidate_id, c.name
    ORDER BY votes DESC
    LIMIT 1
`;

    // Execute the first query to get all votes
    conn.query(queryVotes, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error fetching votes");
        } else {
            // Execute the second query to calculate the winner
            conn.query(queryWinner, (err, winnerResult) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error calculating winner");
                } else {
                    const winner = winnerResult.length > 0 ? winnerResult[0] : null;
                    res.render("a_see_result", {
                        votes: results, // Pass the votes data with candidate names
                        winner: winner, // Pass the winner data including candidate name
                    });
                }
            });
        }
    });
};

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { user_reg } = require("./backend/user_reg.js");
const { user_login} = require("./backend/user_login.js");
const { user_data } = require("./backend/user_dashboard.js");
const { go_to_vote } = require("./backend/goto_vote.js");
const { voted } = require("./backend/vot_ed.js");
const { admin_login } = require("./backend/admin_login.js");
const { see_result } = require("./backend/a_see_result.js");
const { add_candidate } = require("./backend/add_candidate.js");
const { support } = require("./backend/support.js");
const { messages } = require("./backend/a_message_display.js");
const { ai_assi } = require("./backend/ai_assi.js");



const app = express();

// const genAI = new GoogleGenerativeAI("");



// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const upload = multer({ dest: "uploads/" });

app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'], // Allowed origins
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allowed headers
}));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Session management
app.use(
    session({
        secret: "your_secrate_key",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 6000000 },
    })
);



 
// Routes
app.get("/", (req, res) => {
    res.render("user_login"); // Render login page
});

app.get("/user_register", (req, res) => {
    res.render("user_register"); // Render registration page
});

app.get("/services", (req, res) => {
    res.render("services"); // Render services page
});

app.post("/user_register", user_reg); // Handle user registration

app.post("/get-login", user_login); 

app.get("/user_dash", user_data)  // Handle user login

app.post("/support", support);  //updates in database by given support

app.get("/gotovote", go_to_vote);

// Logout route
app.post("/logout", (req, res) => {
    req.session.destroy();
    res.set('Cache-Control', 'no-store'); // Disable caching
    res.redirect("/"); // Redirect to login after logout
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.set('Cache-Control', 'no-store'); // Disable caching
    res.redirect("/"); // Redirect to login after logout
});


app.post("/voted",voted);

app.get("/vote-confirmation" ,(req,res)=>{
    res.render("vote-confirmation");
});


//ADMIN
app.get("/admin",(req,res)=>{
    res.render("admin_login");
});

app.post("/admin-login", admin_login);

app.get("/admin_dash" , (req,res)=>{
    res.render("admin_dash");
});

app.get("/add_candidate",(req,res) => {
    res.render("add_candidate");
});

app.post("/add-candidate",upload.single("symbol"), add_candidate);

// app.get("/see_result",(req,res) => {
//     res.render("a_see_result");
// });

app.get("/see_result", see_result);

app.get("/about_us" ,(req,res)=>{
    res.render("user_about_us");
})

app.get("/support" ,(req,res)=>{
    res.render("support");
})

app.get("/messages", messages)

app.get("/ai_assi", (req,res) =>{
    res.render("ai_assi");
});

// app.post("/ask" , ai_assi);

app.post("/api/generate", async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log("User Message:", userMessage);

        // Initialize the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate a response from the AI model
        const result = await model.generateText({ prompt: userMessage });
        console.log("AI Response:", result.candidates[0].output);

        // Send response to frontend
        res.json({ response: result.candidates[0].output });
    } catch (error) {
        console.error("Error in API /api/generate:", error.message, error.stack);
        res.status(500).json({ error: "Failed to generate response" });
    }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



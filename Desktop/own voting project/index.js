
const { GoogleGenerativeAI } = require("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        async function run() {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
          const result = await model.generateContent(["Explain how AI works"]);
          console.log(result.response.text());
        }
        run();
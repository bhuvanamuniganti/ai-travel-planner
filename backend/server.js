const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const connectDB = require("./config/db");
const Trip = require("./models/Trip");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("AI Travel Planner Backend Running");
});

app.get("/test-openai", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: "Say Hello",
        },
      ],
    });

    res.send(response.choices[0].message.content);
  } catch (error) {
    console.error("OPENAI ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/generate-trip", authMiddleware, async (req,res) => {
    console.log(req.body)
  try {
    const { destination, days, budget, interests } = req.body;

    const prompt = `
Create a detailed ${days}-day travel itinerary for ${destination}.

Budget: ${budget}
Interests: ${interests}

Include:
1. Day-wise activities
2. Recommended food
3. Estimated costs
4. Travel tips
5. Packing suggestions

Keep the response well structured.
`;






    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const itinerary = response.choices[0].message.content;
 
await Trip.create({
  user: req.user.id,
  destination,
  days,
  budget,
  interests,
  itinerary,
});



    res.json({
      success: true,
      itinerary,
    });
  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.get("/trips", authMiddleware, async (req, res) => {
  try{

  const trips = await Trip.find({
  user: req.user.id,
}).sort({ createdAt: -1 });
    res.json({
      success: true,
      trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
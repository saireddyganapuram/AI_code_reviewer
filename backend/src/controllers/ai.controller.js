import getAIResponse  from "../services/ai.services.js";

const getReview = async (req, res) => {
    const code = req.body.code;
    if (!code) {
        return res.status(400).json({ error: "Prompt is required" });
    }
    try {
        const response = await getAIResponse(code);
        res.status(200).send( response );
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ error: "Failed to generate AI response" });
    }
}

export default getReview;
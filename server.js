const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

// Middleware
app.use(cors());
app.use(bodyParser.json());

function alternateCaps(str) {
  return str
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

// Routes
app.get("/", (req, res) => {
  res.send(`BFHL API is running at ${BASE_URL}`);
});

app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.data;

    if (!Array.isArray(inputArray)) {
      return res
        .status(200)
        .json({ is_success: false, message: "Invalid input" });
    }

    let oddNumbers = [];
    let evenNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;

    inputArray.forEach((item) => {
      if (!isNaN(item)) {
        let num = parseInt(item, 10);
        if (!isNaN(num)) {
          sum += num;
          if (num % 2 === 0) {
            evenNumbers.push(item.toString());
          } else {
            oddNumbers.push(item.toString());
          }
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    // Build concat string
    const reversed = inputArray
      .filter((item) => /^[a-zA-Z]+$/.test(item))
      .join("")
      .split("")
      .reverse()
      .join("");

    const concatString = alternateCaps(reversed);

    const response = {
      is_success: true,
      user_id: "aditya_garg_04042004", // format: full_name_ddmmyyyy
      email: "aditya444garg@gmail.com",
      roll_number: "22BCE2128",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(200)
      .json({ is_success: false, message: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}`);
});


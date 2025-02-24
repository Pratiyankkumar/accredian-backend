// Server setup
import express from "express";
import referRouter from "./routes/referRouter";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.Router());

app.use(referRouter);

app.get("/", (req, res) => {
  res.send("Hello, refer-backenda!");
});

app.listen(port, () => {
  console.log(` app is running on http://localhost:${port}`);
});

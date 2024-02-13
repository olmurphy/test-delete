import Express, { Request, Response} from 'express';

const DEFAULT_PORT = 443;
const BODY_SIZE = 409600; // Sets the maximum size for body size, values are in bytes
const PORT = process.env.PORT || DEFAULT_PORT;
const app = Express();
app.disable("x-powered-by");

app.use(Express.json({ limit: BODY_SIZE }));
app.use(Express.urlencoded({
    extended: true,
    limit: BODY_SIZE
}));

// API REQUESTS
app.use("/api/fail", (_req: Request, res: Response) => {
    res.status(403).send("Unauthorized");
});

app.use("/readiness", (req: Request, res: Response) => {
    res.status(200).send("This is a liveness probe test and it works")
});

app.use("/", require("./routes").router)

// start server
app.listen(PORT, () => {
    console.log(`To view your app, open this link in your browser: http://localhost:${PORT}`);
});

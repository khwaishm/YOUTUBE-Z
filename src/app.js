import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
// limiting json file size to 20kb
app.use(
  express.json({
    limit: "20kb",
  })
);
// limiting urlencoded file size to 20kb
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);
//sharing public static files like images,fevicon,css,js
app.use(express.static("public"));

//cookie parser :- for accesing cookies and storing cookies from client side and performing crud operations on cookies.

app.use(
  cookieParser({
    sameSite: "none", //
    secure: true, //cookie will only be sent over https
    httpOnly: true, //prevents client side js from accessing cookies
    maxAge: 60000, //1 minute
    signed: true, //signed cookies
  })
);

export { app };

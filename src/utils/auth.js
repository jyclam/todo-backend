import { User } from "../resources/user/user.model";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_PRIVATE_KEY || "topsecret!";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "30d";

export const newToken = (user) =>
  jwt.sign({ id: user.id }, JWT_KEY, {
    expiresIn: JWT_EXPIRY,
  });

export const verifyToken = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token, JWT_KEY, (err, payload) => {
      if (err) return rej(err);
      res(payload);
    }),
  );

export const signUp = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ error: "Email and password required." });

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error creating account." });
  }
};

export const signIn = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ error: "Email and password required." });

  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password")
      .exec();

    if (!user)
      return res
        .status(401)
        .json({ error: "Invalid email and password combination." });

    const match = await user.checkPassword(req.body.password);

    if (!match)
      return res
        .status(401)
        .json({ error: "Invalid email and password combination." });

    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error authenticating." });
  }
};

export const guard = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer "))
    return res.status(401).json({ error: "Error parsing token from headers." });

  const token = bearer.split("Bearer ")[1].trim();
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token." });
  }

  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();

  if (!user) return res.status(401).json({ error: "User not found." });

  req.user = user;
  next();
};

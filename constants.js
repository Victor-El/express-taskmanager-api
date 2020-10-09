const BCRYPT_ROUNDS = process.env.BCRYPT_ROUNDS;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
const MONGO_URL = process.env.MONGO_URL;

module.exports = {
    BCRYPT_ROUNDS,
    JWT_PRIVATE_KEY,
    MONGO_URL
};
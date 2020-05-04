const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { WRONG_MAIL,
    WRONG_PASSWORD,
    WRONG_SOMETHING,
    WRONG_INPUT_DATA,
    NOT_CORRECT_DATA,
    USER_EXIST,
    USER_CREATED,
    USER_LOGGED } = require('../consts/message');

const router = Router();
const User = require('../models/user');

router.post(
    '/register',
    [
        check('email', WRONG_MAIL).isEmail(),
        check('password', WRONG_PASSWORD).isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: NOT_CORRECT_DATA
                });
            }

            const { firstName, secondName, email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: USER_EXIST });
            }

            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(password.toString(), 12, (err, hash) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(hash)
                });
            });

            const user = new User({ firstName, secondName, email, password: hashedPassword, personalRecipes: [] });

            await user.save();

            res.status(201).json({ message: USER_CREATED });
        } catch (e) {
            res.status(500).json({ message: WRONG_SOMETHING });
        }
    }
);

router.post(
    '/login',
    [
        check('email', WRONG_MAIL).isEmail(),
        check('password', WRONG_PASSWORD).exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: NOT_CORRECT_DATA
                });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: USER_EXIST });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: WRONG_SOMETHING });
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' }
            );

            const { firstName, secondName } = user;
            res.status(200).json({ token, userId: user._id, firstName, secondName, email, message: USER_LOGGED });
        } catch (e) {
            res.status(500).json({ message: WRONG_SOMETHING });
        }
    }
);
router.post(
    '/user',
    async (req, res) => {
        try {
            const { userId } = req.body;

            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(400).json({ message: WRONG_INPUT_DATA });
            }

            const { firstName, secondName, email } = user;
            res.json({ firstName, secondName, email });
        } catch (e) {
            res.status(500).json({ message: WRONG_SOMETHING });
        }
    }
);

module.exports = router;
const express = require("express");
const router = express.Router();

const { verifyRefreshJWT, createAccessJWT } = require("../helpers/jwt.helper");
const { getUserByEmail } = require("../modals/user/User.model");

//return refresh jwt
router.get("/", async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)

  //TODO

  const decoded = await verifyRefreshJWT(authorization);
  console.log(decoded)
  if (decoded.email) {
    const userProf = await getUserByEmail(decoded.email);

    if (userProf._id) {
      let tokenExp = userProf.refreshJWT.addedAt;
      const dBrefreshToken = userProf.refreshJWT.token;

      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
      );

      const today = new Date();

      if (dBrefreshToken !== authorization && tokenExp < today) {
        return res.status(403).json({ message: "Forbiddedn" });
      }

      const accessJWT = await createAccessJWT(
        decoded.email,
        userProf._id.toString()
      );

      return res.json({ status: "success", accessJWT });
    }
  }
  res.status(403).json({ message: "Forbiddend" });
});

module.exports = router;
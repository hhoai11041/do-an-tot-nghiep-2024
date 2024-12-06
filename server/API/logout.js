import express from "express";

const apiLogoutAccount = express.Router();

apiLogoutAccount.post("/api/logout", async (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,      
    secure: true,         
    sameSite: 'None',         
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

export default apiLogoutAccount;

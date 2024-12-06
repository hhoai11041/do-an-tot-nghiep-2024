app.post('/logout', (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,      
    secure: true,         
    sameSite: 'None',    
    path: '/',            
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

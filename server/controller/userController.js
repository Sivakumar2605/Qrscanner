import ScannedUser from '../model/User.js'; // Ensure .js extension

export const createScannedUser = async (req, res) => {
  try {
    const { name, mobile, address, qrUrl, ipAddress } = req.body;
    const newUser = new ScannedUser({ name, mobile, address, qrUrl, ipAddress });
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

import { Request, Response } from 'express';
import sendOTP from '../../Functions/OTP/sendOtp.js';
import generateOtp from '../../Functions/OTP/generateOtp.js';

interface SendOtpRequestBody {
  mb_no: string;
}

const sendOtp = async (req: Request<{}, {}, SendOtpRequestBody>, res: Response) => {
  try {
    const { mb_no } = req.body;
    // const msg = await sendOTP(mb_no);

    //Temporary
    const msg = 123456;
    return res.status(200).json({ msg: msg });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ msg: "Failed to send OTP", error: error.message });
  }
};

export default sendOtp;
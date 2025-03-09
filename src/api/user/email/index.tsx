"use server";
import { ReactElement } from "react";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import { emailConfig } from "@/config/email";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";
import prisma from "@/api/prisma/init";
import { userService } from "..";
import { appConfig } from "@/config";
import { passTokenService } from "../passTokens";
import ResetPasswordSuccessEmail from "./templates/ResetPasswordSuccessMail";
import SignupSuccessEmail from "./templates/SignupSuccessEmail";
import PurchaseSuccessEmail from "./templates/PurchaseSuccessEmail";
import PurchaseFailureEmail from "./templates/PurchaseFailureEmail";

export const generateToken = async (userId: string) => {
  try {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

    // Store token in DB
    await prisma.passwordResetToken.upsert({
      where: { userId },
      update: { token: resetToken, expiresAt: tokenExpiry },
      create: { userId, token: resetToken, expiresAt: tokenExpiry },
    });

    return resetToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

type EmailType =
  | "signup"
  | "resetPass"
  | "resetPassSuccess"
  | "purchaseSuccess"
  | "purchaseFailure";

export async function sendEmail(email: string, type: EmailType) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: emailConfig,
    });
    const user = await userService.findByUniqueProperty("email", email);
    if (!user) return;
    const resetToken = await generateToken(user.id);
    const resetLink = `${appConfig.url}/sifreyi-sifirla?token=${resetToken}`;

    let emailHtml: any;
    let subject: string = "";
    switch (type) {
      case "signup":
        emailHtml = await render(<SignupSuccessEmail />);
        subject =
          "Üye kaydınız başarıyla gerçekleşti - gmvahap.com - Online Satranç Okulu - Hoşgeldiniz";
        break;
      case "resetPass":
        emailHtml = await render(<ResetPasswordEmail resetLink={resetLink} />);
        subject =
          "Şifre Değişiklik Talebi - gmvahap.com - Online Satranç Okulu";

        break;
      case "resetPassSuccess":
        emailHtml = await render(<ResetPasswordSuccessEmail />);
        subject =
          "Şifre Değişikliği başarıyla gerçekleşti - gmvahap.com - Online Satranç Okulu";
        break;
      case "purchaseSuccess":
        emailHtml = await render(<PurchaseSuccessEmail />);
        subject =
          "Satın alım başarıyla gerçekleşti - gmvahap.com - Online Satranç Okulu";
        break;
      case "purchaseFailure":
        emailHtml = await render(<PurchaseFailureEmail />);
        subject =
          "Satın alım sırasında bir hata oluştu - gmvahap.com - Online Satranç Okulu";
        break;
      default:
        return;
    }
    await transporter.sendMail({
      from: emailConfig.user,
      to: email, // Replace with your desired recipient
      subject,
      //text: typeof content === "string" ? content : undefined,
      html: emailHtml,
      replyTo: email,
    });
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to send email." };
  }
}

export const getPasswordResetToken = async (token: string) => {
  try {
    const passToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

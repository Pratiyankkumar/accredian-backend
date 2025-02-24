import express from "express";
import { z } from "zod";
import prisma from "../db/prismaClient";
import { Prisma } from "@prisma/client";
import { sendReferralEmail } from "../utils/nodeMailer";

const router = express.Router();

// Define referral schema validation
const referralSchema = z.object({
  referrerName: z.string().min(1, "Referrer name is required"),
  referrerEmail: z.string().email("Invalid email format"),
  referrerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  refereeName: z.string().min(1, "Referee name is required"),
  refereeEmail: z.string().email("Invalid email format"),
  refereePhone: z.string().min(10, "Phone number must be at least 10 digits"),
  refereeCompany: z.string().min(1, "Referee company is required"),
  refereePosition: z.string().min(1, "Referee position is required"),
  relationshipToReferee: z
    .string()
    .min(1, "Relationship to referee is required"),
  message: z.string().min(1, "Message is required"),
});

router.post("/referral", async (req, res) => {
  try {
    // Validate input data
    const validatedData = referralSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        success: false,
        code: "VALIDATION_ERROR",
        errors: validatedData.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    // Save referral to database
    const referral = await prisma.referral.create({
      data: validatedData.data,
    });

    // Attempt to send email but don't fail request if it fails
    try {
      await sendReferralEmail(
        validatedData.data.refereeEmail,
        validatedData.data.referrerName,
        validatedData.data.refereeName
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't return an error, just log it
    }

    // Respond with success
    return res.status(201).json({
      success: true,
      data: referral,
    });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle Prisma database errors
      if (error.code === "P2002") {
        return res.status(409).json({
          success: false,
          code: "DUPLICATE_ENTRY",
          message: "A referral with this information already exists",
        });
      }

      return res.status(400).json({
        success: false,
        code: "DATABASE_ERROR",
        message: "Database operation failed",
      });
    }

    console.error("Unexpected server error:", error);

    return res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "An unexpected error occurred",
    });
  }
});

export default router;

import express from "express";

import { isAdmin, isAuthenticated } from "../middlewares/authMiddlewares";
import { upload } from "../middlewares/multerMiddleware";

import {
  createUpload,
  deleteBilling,
  getBillingsReportData,
  getListOfMeasures,
  sendProofOfPayment,
  getUnpaidBillings,
  markBillingAsPaid,
} from "../controllers/uploadControllers";

const router = express.Router();

router.post("/upload", isAuthenticated, upload.single("file"), createUpload);
router.get("/list", isAuthenticated, getListOfMeasures);
router.post(
  "/proof",
  isAuthenticated,
  upload.single("file"),
  sendProofOfPayment
);
router.delete("/deleteBilling", isAuthenticated, isAdmin, deleteBilling);
router.get(
  "/billingsReportData",
  isAuthenticated,
  isAdmin,
  getBillingsReportData
);
router.get("/unpaidBillings", isAuthenticated, isAdmin, getUnpaidBillings);
router.patch(
  "/billing/:billingId/mark-paid",
  isAuthenticated,
  isAdmin,
  markBillingAsPaid
);
export { router };

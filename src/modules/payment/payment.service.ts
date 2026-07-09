import { User } from "../../../generated/prisma/client";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import ThrowError from "../../utils/throwError";
import { ICreatePaymentPayload } from "./payment.interface";
import httpStatus from "http-status";
import axios from "axios";

const initiatePaymentIntoDB = async (
  customer: User,
  payload: ICreatePaymentPayload
) => {
  const tnxId = `TRNX_ID_${Date.now()}`;

  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
  });

  if (!booking) {
    throw new ThrowError(httpStatus.NOT_FOUND, "Booking not found!");
  }

  const paymentData = {
    store_id: config.ssl_commerez_sotre_id,
    store_passwd: config.ssl_commerez_sotre_password,
    total_amount: booking.totalPrice,
    currency: "BDT",
    tran_id: tnxId,
    success_url: `${config.app_url}/api/payments?bookingId=${booking.id}&tranId=${tnxId}&status=success`,
    fail_url: `${config.app_url}/api/payments?bookingId=${booking.id}&tranId=${tnxId}&status=fail`,
    cancel_url: `${config.app_url}/api/payments?bookingId=${booking.id}&tranId=${tnxId}&status=cancel`,
    cus_name: customer.name,
    cus_email: customer.email,
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: 1000,
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
  };

  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    paymentData,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const data = await response.data;

  await prisma.payment.create({
    data: {
      transactionId: tnxId,
      bookingId: booking.id,
      amount: Number(booking.totalPrice),
    },
  });
  const gatewayURL = data.GatewayPageURL;

  return { gatewayURL };
};

const verifyPaymentIntoDB = async (
  bookingId: string,
  tranId: string,
  status: string,
  payload: any
) => {
  const response = await axios.post(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${payload.val_id}&store_id=${config.ssl_commerez_sotre_id}&store_passwd=${config.ssl_commerez_sotre_password}&format=json`,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  const data = await response.data;

  if (data.status === "VALID") {
    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "PAID",
      },
    });

    await prisma.payment.update({
      where: { transactionId: tranId },
      data: {
        status: "COMPLETED",
        meta: payload,
      },
    });
  } else if (data.status === "INVALID_TRANSACTION") {
    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "DECLINED",
      },
    });

    await prisma.payment.update({
      where: { transactionId: tranId },
      data: {
        status: "FAILED",
        meta: payload,
      },
    });
  }

  if (data.status === "INVALID_TRANSACTION") {
    throw new ThrowError(httpStatus.EXPECTATION_FAILED, "Payment failed!");
  }
  return { status: "Payment successful!" };
};
const getCurrentUserPaymentsFromDB = async () => {};

export const paymentServices = {
  initiatePaymentIntoDB,
  verifyPaymentIntoDB,
  getCurrentUserPaymentsFromDB,
};

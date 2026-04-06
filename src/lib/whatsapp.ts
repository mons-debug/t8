const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "212660027233";

/**
 * Generate a WhatsApp deep link with pre-filled message.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Customer wants to book a specific car.
 */
export function whatsappBookingLink(
  carName: string,
  startDate: string,
  endDate: string
): string {
  return whatsappLink(
    `Bonjour, je voudrais réserver une ${carName} du ${startDate} au ${endDate}.`
  );
}

/**
 * General inquiry from the website.
 */
export function whatsappGeneralLink(): string {
  return whatsappLink(
    "Bonjour, je visite votre site et j'ai une question..."
  );
}

/**
 * Owner sends confirmation to customer.
 */
export function whatsappConfirmationLink(
  customerPhone: string,
  customerName: string,
  carName: string,
  pickupDate: string,
  pickupLocation: string
): string {
  const msg = `Bonjour ${customerName}, votre réservation est confirmée !\n\nVoiture: ${carName}\nDate: ${pickupDate}\nLieu: ${pickupLocation}\n\nMerci de votre confiance !\nT8 Auto`;
  return `https://wa.me/${customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;
}

/**
 * New booking alert for owner.
 */
export function whatsappNewBookingAlert(
  customerName: string,
  customerPhone: string,
  carName: string,
  dates: string
): string {
  return whatsappLink(
    `🔔 Nouvelle réservation !\n\nClient: ${customerName}\nTel: ${customerPhone}\nVoiture: ${carName}\nDates: ${dates}`
  );
}

import PDFDocument from 'pdfkit';
import { verifyAdminToken } from '@/lib/firebaseAdmin.mjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await verifyAdminToken(req.headers.authorization);
  } catch (error) {
    return res.status(error.status || 401).json({ message: error.message || 'Non autorisé' });
  }

  const { orders } = req.body;
  if (!Array.isArray(orders) || orders.length === 0 || orders.length > 50) {
    return res.status(400).json({ message: 'Commandes invalides' });
  }

  // Créer un nouveau document PDF
  const doc = new PDFDocument();

  // Configuration de la réponse
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=shipping-labels.pdf');

  // Pipe le PDF directement dans la réponse
  doc.pipe(res);

  // Générer une étiquette pour chaque commande
  orders.forEach((order, index) => {
    if (index > 0) {
      doc.addPage();
    }

    // En-tête
    doc.fontSize(20).text('Étiquette d\'expédition', { align: 'center' });
    doc.moveDown();

    // Informations de la commande
    doc.fontSize(12);
    doc.text(`N° de commande: #${order.id.slice(0, 8)}`);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`);
    doc.moveDown();

    // Adresse de livraison
    doc.fontSize(14).text('Adresse de livraison:', { underline: true });
    doc.fontSize(12);
    doc.text(order.name);
    doc.text(order.address);
    doc.text(`${order.zipcode} ${order.city}`);
    doc.text(order.country);
    doc.moveDown();

    // Informations de contact
    doc.fontSize(14).text('Contact:', { underline: true });
    doc.fontSize(12);
    // doc.text(`Email: ${order.email}`);
    doc.text(`Téléphone: ${order.phone}`);
    doc.moveDown();

    // Mode de paiement
    doc.fontSize(14).text('Paiement:', { underline: true });
    doc.fontSize(12);
    doc.text(order.paymentMethod);
    doc.moveDown();

    // Détails de la commande
//     doc.fontSize(14).text('Détails de la commande:', { underline: true });
//     doc.fontSize(12);
//     if (order.items && order.items.length > 0) {
//       order.items.forEach(item => {
//         doc.text(`- ${item.nb}x ${item.name}`);
//       });
//     }
  });

  // Finaliser le PDF
  doc.end();
} 
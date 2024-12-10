import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public/images'),
    keepExtensions: true,
    maxFiles: 5,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const uploadedFiles = Array.isArray(files.images) ? files.images : [files.images];
    const filenames = uploadedFiles.map(file => path.basename(file.filepath));

    res.status(200).json({ filenames });
  } catch (error) {
    console.error('Erreur upload:', error);
    res.status(500).json({ message: 'Erreur lors de l\'upload' });
  }
} 
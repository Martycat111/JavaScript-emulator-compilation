import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false
  }
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

export default async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({ uploadDir, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'File upload failed' });
      }

      const ndsFile = files.ndsFile[0];
      const savFile = files.savFile ? files.savFile[0] : null;

      const ndsPath = `/uploads/${path.basename(ndsFile.path)}`;
      const savPath = savFile ? `/uploads/${path.basename(savFile.path)}` : '';

      res.status(200).json({ message: 'Files uploaded successfully', ndsPath, savPath });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

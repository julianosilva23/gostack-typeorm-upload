import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export const destinationPath = path.resolve(__dirname, '..', '..', 'temp');

export default {
  storage: multer.diskStorage({
    destination: destinationPath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    }
  })
};

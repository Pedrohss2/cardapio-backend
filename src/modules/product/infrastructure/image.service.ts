import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname } from 'path';

@Injectable()
export class ImageService {
    private uploadsDir = './uploads';

    ensureUploadsDir() {
        if (!existsSync(this.uploadsDir)) {
            mkdirSync(this.uploadsDir, { recursive: true });
        }
    }

    async saveFile(file: Express.Multer.File): Promise<string> {
        try {
            this.ensureUploadsDir();

            const ext = extname(file.originalname || '');
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const filename = `${uniqueSuffix}${ext}`;
            const path = `${this.uploadsDir}/${filename}`;

            if (file.buffer) {
                writeFileSync(path, file.buffer);
            } else if ((file as any).path) {
                return (file as any).filename || (file as any).originalname;
            } else {
                throw new Error('No file buffer or path available');
            }

            return filename;
        } catch (err) {
            throw new InternalServerErrorException('Failed to save file');
        }
    }
}

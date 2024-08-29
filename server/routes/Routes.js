import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createScannedUser } from '../controller/userController.js';

// Get the current directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.post('/scanned-user', createScannedUser);

// Debugging path resolution
const controllerPath = path.resolve(__dirname, '../controller/userController.js');
console.log(`Current directory: ${__dirname}`);
console.log(`Resolved path: ${controllerPath}`);

export default router;

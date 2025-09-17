import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
const stateFile = path.join(dataDir, 'state.json');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(stateFile)) {
    fs.writeFileSync(stateFile, JSON.stringify({ guideFileId: null, deliveredUserIds: [] }, null, 2));
  }
}

export function readState() {
  ensureDataDir();
  try {
    const content = fs.readFileSync(stateFile, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    return { guideFileId: null, deliveredUserIds: [] };
  }
}

export function writeState(newState) {
  ensureDataDir();
  fs.writeFileSync(stateFile, JSON.stringify(newState, null, 2));
}

export const state = readState();

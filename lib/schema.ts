import fs from 'fs';
import path from 'path';

const schemaDirectory = path.join(process.cwd(), 'content/schemas');

export function getSchemaBySlug(slug: string): string | null {
  const fullPath = path.join(schemaDirectory, `${slug}.json`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return fs.readFileSync(fullPath, 'utf8');
}

export function getSchemaObjectBySlug(slug: string): object | null {
  const schema = getSchemaBySlug(slug);
  if (!schema) return null;
  
  try {
    return JSON.parse(schema);
  } catch {
    return null;
  }
}


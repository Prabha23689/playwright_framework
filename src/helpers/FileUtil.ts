import * as fs from 'fs';
import * as path from 'path';

export class FileUtil {
  static readJson<T>(relativePath: string): T {
    const absolutePath = path.resolve(process.cwd(), relativePath);
    return JSON.parse(fs.readFileSync(absolutePath, 'utf-8')) as T;
  }

  static writeJson(relativePath: string, data: unknown): void {
    const absolutePath = path.resolve(process.cwd(), relativePath);
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  static exists(relativePath: string): boolean {
    return fs.existsSync(path.resolve(process.cwd(), relativePath));
  }
}

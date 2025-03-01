import { globby } from 'globby';
import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { build } from 'vite';

async function execCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', [command, ...args], { stdio: 'inherit' });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

async function buildSlides() {
  try {
    console.log('Starting build process...');

    // 出力ディレクトリの作成
    //await fs.mkdir('public/slides', { recursive: true });
    await fs.mkdir('dist/slides', { recursive: true });

    // 既存のビルド済みファイルの確認
    const existingFiles = new Map();
    try {
      console.log('Checking existing files...');
      const files = await fs.readdir('public/slides');
      for (const file of files) {
        const stat = await fs.stat(path.join('public/slides', file));
        existingFiles.set(file, stat.mtime);
      }
      console.log(`Found ${existingFiles.size} existing files`);
    } catch (e) {
      console.log('No existing files found');
    }

    // スライドファイルの検索
    const slideFiles = await globby('src/slides/*.md');
    console.log(`Found ${slideFiles.length} markdown files`);
    
    // 各スライドの処理
    for (const filePath of slideFiles) {
      const basename = path.basename(filePath, '.md');
      const stat = await fs.stat(filePath);
      
      const htmlPath = `${basename}.html`;
      const pdfPath = `${basename}.pdf`;
      
      const needsRebuild = 
        !existingFiles.has(htmlPath) || 
        !existingFiles.has(pdfPath) ||
        stat.mtime > existingFiles.get(htmlPath) ||
        stat.mtime > existingFiles.get(pdfPath);

      console.log(`\nChecking ${basename}:`);
      console.log(`- HTML exists: ${existingFiles.has(htmlPath)}`);
      console.log(`- PDF exists: ${existingFiles.has(pdfPath)}`);
      console.log(`- Source modified: ${stat.mtime}`);
      if (existingFiles.has(htmlPath)) {
        console.log(`- HTML modified: ${existingFiles.get(htmlPath)}`);
      }
      console.log(`- Needs rebuild: ${needsRebuild}`);

      if (needsRebuild) {
        console.log(`\nProcessing ${basename}...`);
        
        // HTMLの生成
        console.log('- Generating HTML...');
        await execCommand('@marp-team/marp-cli', [
          filePath,
          '-o',
          `dist/slides/${basename}.html`
        ]);
        
        // PDFの生成
        console.log('- Generating PDF...');
        await execCommand('@marp-team/marp-cli', [
          filePath,
          '-o',
          `dist/slides/${basename}.pdf`,
          '--pdf'
        ]);
        
        console.log(`✓ Completed ${basename}`);
      } else {
        console.log(`Skipping ${basename} (no changes)`);
      }
    }

    // slides.jsonの生成
    console.log('\nGenerating slides.json...');
    const slides = slideFiles.map(filePath => {
      const basename = path.basename(filePath, '.md');
      const year = basename.substring(0, 4);
      const month = basename.substring(4, 6);
      const day = basename.substring(6, 8);
      
      return {
        date: `${year}/${month}/${day}`,
        title: basename.length > 8 ? basename.substring(9).replace(/-/g, ' ') : 'Untitled',
        htmlPath: `/slides/${basename}.html`,
        pdfPath: `/slides/${basename}.pdf`
      };
    })
    .sort((a, b) => {
      // 日付の降順（新しい順）でソート
      return b.date.localeCompare(a.date);
    });

    await fs.mkdir('src/data', { recursive: true });
    await fs.writeFile(
      'src/data/slides.json',
      JSON.stringify(slides, null, 2)
    );
    
    console.log('\nBuild completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildSlides();
import { globby } from "globby";
import fs from "fs/promises";
import path from "path";
import { spawn } from "child_process";
import matter from "gray-matter";

async function execCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", [command, ...args], { stdio: "inherit" });

    proc.on("close", (code) => {
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
    console.log("Starting build process...");

    // 出力ディレクトリの作成
    await fs.mkdir("public/slides", { recursive: true });
    await fs.mkdir("public/drafts", { recursive: true });

    // 既存のビルド済みファイルの確認
    const existingPublishedFiles = new Map();
    const existingDraftFiles = new Map();

    try {
      console.log("Checking existing published files...");
      const publishedFiles = await fs.readdir("public/slides");
      for (const file of publishedFiles) {
        const stat = await fs.stat(path.join("public/slides", file));
        existingPublishedFiles.set(file, stat.mtime);
      }
      console.log(
        `Found ${existingPublishedFiles.size} existing published files`
      );
    } catch (e) {
      console.log("No existing published files found");
    }

    try {
      console.log("Checking existing draft files...");
      const draftFiles = await fs.readdir("public/drafts");
      for (const file of draftFiles) {
        const stat = await fs.stat(path.join("public/drafts", file));
        existingDraftFiles.set(file, stat.mtime);
      }
      console.log(`Found ${existingDraftFiles.size} existing draft files`);
    } catch (e) {
      console.log("No existing draft files found");
    }

    // スライドファイルの検索
    const slideFiles = await globby("src/slides/*.md");
    console.log(`Found ${slideFiles.length} markdown files`);

    // スライドの情報を格納する配列
    const publishedSlides = [];
    const draftSlides = [];

    // 各スライドの処理
    for (const filePath of slideFiles) {
      // フロントマターの解析
      const fileContent = await fs.readFile(filePath, "utf-8");
      const { data: frontMatter } = matter(fileContent);
      const status = frontMatter.status || "published"; // デフォルトは公開状態

      const basename = path.basename(filePath, ".md");
      const stat = await fs.stat(filePath);

      // 出力先を決定
      const outputDir = status === "draft" ? "public/drafts" : "public/slides";
      const existingFiles =
        status === "draft" ? existingDraftFiles : existingPublishedFiles;

      const htmlPath = `${basename}.html`;
      const pdfPath = `${basename}.pdf`;

      const needsRebuild =
        !existingFiles.has(htmlPath) ||
        !existingFiles.has(pdfPath) ||
        stat.mtime > existingFiles.get(htmlPath) ||
        stat.mtime > existingFiles.get(pdfPath);

      console.log(`\nChecking ${basename}:`);
      console.log(`- Status: ${status}`);
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
        console.log("- Generating HTML...");
        await execCommand("@marp-team/marp-cli", [
          filePath,
          "--allow-local-files",
          "-o",
          `${outputDir}/${basename}.html`,
        ]);

        // PDFの生成
        console.log("- Generating PDF...");
        await execCommand("@marp-team/marp-cli", [
          filePath,
          "--allow-local-files",
          "-o",
          `${outputDir}/${basename}.pdf`,
          "--pdf",
        ]);

        console.log(`✓ Completed ${basename}`);
      } else {
        console.log(`Skipping ${basename} (no changes)`);
      }

      // スライド情報の作成
      const slideInfo = {
        date: `${basename.substring(0, 4)}/${basename.substring(
          4,
          6
        )}/${basename.substring(6, 8)}`,
        title:
          basename.length > 8
            ? basename.substring(9).replace(/-/g, " ")
            : "Untitled",
        htmlPath: `${
          status === "draft" ? "drafts" : "slides"
        }/${basename}.html`,
        pdfPath: `${status === "draft" ? "drafts" : "slides"}/${basename}.pdf`,
        status: status,
      };

      // 公開用またはドラフト用の配列に追加
      if (status === "draft") {
        draftSlides.push(slideInfo);
      } else {
        publishedSlides.push(slideInfo);
      }
    }

    // 日付の降順でソート
    publishedSlides.sort((a, b) => b.date.localeCompare(a.date));
    draftSlides.sort((a, b) => b.date.localeCompare(a.date));

    // slides.jsonの生成
    await fs.mkdir("src/data", { recursive: true });
    await fs.writeFile(
      "src/data/slides.json",
      JSON.stringify(
        {
          published: publishedSlides,
        },
        null,
        2
      )
    );
    // 下書き用のJSONは別ファイルに保存（gitignoreに含める）
    await fs.writeFile(
      "src/data/drafts.json",
      JSON.stringify(
        {
          drafts: draftSlides,
        },
        null,
        2
      )
    );

    // 未使用ファイルを削除
    console.log("\nCleaning up unused files...");

    // 使用中のファイル名のセットを作成
    const usedPublishedFiles = new Set(
      publishedSlides.flatMap((s) => [
        path.basename(s.htmlPath),
        path.basename(s.pdfPath),
      ])
    );

    const usedDraftFiles = new Set(
      draftSlides.flatMap((s) => [
        path.basename(s.htmlPath),
        path.basename(s.pdfPath),
      ])
    );

    try {
      // 公開ディレクトリの未使用ファイルを削除
      const allPublishedFiles = await fs.readdir("public/slides");
      for (const file of allPublishedFiles) {
        if (!usedPublishedFiles.has(file)) {
          console.log(`- Removing unused file: public/slides/${file}`);
          await fs.unlink(`public/slides/${file}`);
        }
      }
    } catch (e) {
      console.log("No files to clean up in public/slides");
    }

    try {
      // ドラフトディレクトリの未使用ファイルを削除
      const allDraftFiles = await fs.readdir("public/drafts");
      for (const file of allDraftFiles) {
        if (!usedDraftFiles.has(file)) {
          console.log(`- Removing unused file: public/drafts/${file}`);
          await fs.unlink(`public/drafts/${file}`);
        }
      }
    } catch (e) {
      console.log("No files to clean up in public/drafts");
    }

    console.log("\nBuild completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

buildSlides();

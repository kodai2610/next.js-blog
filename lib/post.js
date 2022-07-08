import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); //ファイル名(id)
    console.log(id);

    //マークダウンファイルを取得する
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData;
}

//getStaticPathで使うpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/.md$/, ""),
      },
    };
  });
}
/**
 * [
 * {
 *  params: {
 *     id: ~
 *  },
 * {
 *  params: {
 *     id: ~
 *  },
 * {
 *  params: {
 *     id: ~
 *  },
 * ]
 */

//idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  console.log(id);
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContent);

  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHtml = blogContent.toString();

  return {
    id,
    blogContentHtml,
    ...matterResult.data,
  };
}

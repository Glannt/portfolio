import fs from "fs/promises";
import path from "path";

import { handbookArticles, handbookCategories, HandbookArticle } from "@/data/handbook";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "handbook-store.json");

export interface HandbookStoreData {
  categories: typeof handbookCategories;
  articles: HandbookArticle[];
}

export async function getHandbookData(): Promise<HandbookStoreData> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const data = JSON.parse(fileContent);

    if (Array.isArray(data.articles) && data.articles.length > 0) {
      return {
        categories: data.categories || handbookCategories,
        articles: data.articles,
      };
    }
  } catch {
    // If file doesn't exist or is invalid, initialize with default seed
    await saveHandbookData({
      categories: handbookCategories,
      articles: handbookArticles,
    });
  }

  return {
    categories: handbookCategories,
    articles: handbookArticles,
  };
}

export async function saveHandbookData(data: HandbookStoreData): Promise<void> {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw error;
  }
}

export async function addArticle(newArticle: HandbookArticle): Promise<HandbookArticle[]> {
  const data = await getHandbookData();
  const existsIndex = data.articles.findIndex((a) => a.id === newArticle.id);

  if (existsIndex >= 0) {
    data.articles[existsIndex] = newArticle;
  } else {
    data.articles.push(newArticle);
  }

  await saveHandbookData(data);
  return data.articles;
}

export async function updateArticle(
  id: string,
  updatedFields: Partial<HandbookArticle>,
): Promise<HandbookArticle | null> {
  const data = await getHandbookData();
  const index = data.articles.findIndex((a) => a.id === id);

  if (index === -1) return null;

  data.articles[index] = {
    ...data.articles[index],
    ...updatedFields,
  };

  await saveHandbookData(data);
  return data.articles[index];
}

export async function deleteArticle(id: string): Promise<boolean> {
  const data = await getHandbookData();
  const initialLength = data.articles.length;
  data.articles = data.articles.filter((a) => a.id !== id);

  if (data.articles.length === initialLength) return false;

  await saveHandbookData(data);
  return true;
}

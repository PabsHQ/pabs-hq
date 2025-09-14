import PageWrapper from "./components/pageWrapper";
import { getNews } from "./helper/getNews";
import { NewsItem } from "./interfaces/newsDto.model";

export const revalidate = 3600;
export default async function Home() {
  const news: NewsItem[] = ((await getNews()) as NewsItem[]) || [];
  
  return <PageWrapper news={news} />;
}

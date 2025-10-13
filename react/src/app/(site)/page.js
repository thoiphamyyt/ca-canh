import Hero from "../../layout/user/Hero";
import Product from "../../layout/user/Product";
import ArticleList from "../../layout/user/ArticleList";
import FeaturedProductsList from "../../layout/user/FeaturedProductsList";
import IdleLogoutWrapper from "./IdleLogoutWrapper";

export default function HomePage() {
  return (
    <section>
      <IdleLogoutWrapper />
      <Hero />
      <Product />
      <FeaturedProductsList title="Sản phẩm nổi bật" />
      <ArticleList />
    </section>
  );
}

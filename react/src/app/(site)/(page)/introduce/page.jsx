import ListProduct from "./listProduct";
import Cart from "./cart";
import Content from "./content";

export default function FishShopPage() {
  return (
    <main>
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-200">
        <Content />
        <ListProduct />
        <Cart />
      </div>
    </main>
  );
}

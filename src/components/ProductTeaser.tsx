import { Box, ArrowRight } from 'lucide-react';
import { productSiteUrl } from '../data/content';

export function ProductTeaser() {
  return (
    <section className="section product-section" id="products" aria-labelledby="product-title">
      <div className="product-teaser">
        <Box size={34} aria-hidden="true" />
        <div>
          <div className="section-kicker">первые следы экосистемы</div>
          <h2 id="product-title" className="product-title">
            Первые продукты Суздальской IT Долины
          </h2>
          <p>
            Уже сейчас формируется портфель первых цифровых продуктов. Часть работает, часть находится на
            стадии MVP или активной разработки. Это первые видимые следы будущей экосистемы.
          </p>
        </div>
        <a className="button button-ghost product-button" href={productSiteUrl} target="_blank" rel="noreferrer">
          Перейти к продуктам <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

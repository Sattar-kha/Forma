import React from 'react';
import { Product, formatINR } from '../data/products';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  imageSrc?: string;
  imageContainerClassName?: string;
  className?: string;
}

export function ProductCard({
  product,
  onSelect,
  imageSrc,
  imageContainerClassName = 'aspect-[320/380]',
  className = '',
}: ProductCardProps) {
  const src = imageSrc || product.cardImage;

  return (
    <article className={`group flex flex-col ${className}`}>
      <button
        type="button"
        onClick={() => onSelect(product.id)}
        className="w-full text-left focus-visible:outline-1 focus-visible:outline-[#1F1F1F] cursor-pointer"
        aria-label={`View ${product.name}, priced at ${formatINR(product.price)}`}
      >
        <div
          className={`w-full bg-white overflow-hidden flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${imageContainerClassName}`}
        >
          <img
            src={src}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          />
        </div>

        <div className="pt-2.5 sm:pt-3 flex flex-col gap-0.5">
          <h3 className="text-[12.5px] sm:text-[13px] font-normal text-[#767676] group-hover:text-[#1F1F1F] transition-colors duration-200 leading-snug">
            {product.name}
          </h3>
          <p className="text-[14px] sm:text-[14.5px] font-normal text-[#1F1F1F] tabular-nums leading-snug">
            {formatINR(product.price)}
          </p>
        </div>
      </button>
    </article>
  );
}

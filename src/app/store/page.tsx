import type { Metadata } from 'next';
import { StorefrontHome } from './HomeClient';

export const metadata: Metadata = {
  title: 'Amana Mart — Shop Groceries, Pharmacy, Electronics & More',
  description:
    "Bangladesh's leading multi-module marketplace. Shop from thousands of stores — groceries, pharmacy, electronics, fashion, food delivery and more.",
};

export default function StorePage() {
  return <StorefrontHome />;
}

'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { 
  Shield, 
  FileText, 
  Info, 
  HelpCircle, 
  Truck, 
  RefreshCcw, 
  Lock, 
  CreditCard,
  Heart,
  Users,
  Briefcase,
  Globe,
  ShoppingCart,
  Activity,
  Package,
  Car,
  LifeBuoy
} from 'lucide-react';

// Extensive Content for CMS Pages (Expanding to cover all links)
const CMS_CONTENT: Record<string, { title: string, icon: any, content: string }> = {
  // Company Pages
  'about-us': {
    title: 'About AmanaMart',
    icon: Info,
    content: `AmanaMart is Bangladesh's premier super-app ecosystem, designed to bring ultimate convenience to your doorstep. We integrate 8 core business modules—Grocery, Pharmacy, Food, Shop, Courier, Services, Classifieds, and Ride/Rental—into a single, seamless platform.

Our mission is to empower local businesses while providing a world-class shopping experience for consumers. With AmanaMart, you can order your daily groceries, life-saving medicines, favorite meals, and the latest electronics, all while enjoying reliable courier and professional home services.`
  },
  'contact-us': {
    title: 'Contact Us',
    icon: LifeBuoy,
    content: `We are here to help you 24/7.
    
Email: care@amanamart.com
Phone: +880 1234 567890
Office: Level 12, ABC Tower, Gulshan 2, Dhaka-1212, Bangladesh.

For business inquiries, please contact: business@amanamart.com
For media and press: press@amanamart.com`
  },
  'careers': {
    title: 'Work with AmanaMart',
    icon: Briefcase,
    content: `Join the revolution of smart commerce in Bangladesh. At AmanaMart, we are always looking for passionate innovators, engineers, and market specialists.

Current Openings:
- Senior Fullstack Engineer (Next.js/Node.js)
- Product Manager (Super-app Ecosystem)
- Operations Lead (Logistics & Fleet)
- Customer Experience Specialist

Send your CV to: careers@amanamart.com`
  },

  // General Policies
  'privacy-policy': {
    title: 'Privacy Policy',
    icon: Shield,
    content: `Your privacy is our utmost priority. We collect data only to provide and improve our services.
    
1. Data Collection: We collect name, address, and phone number for delivery purposes.
2. Payment Info: We do not store your credit card details; all transactions are processed via secure gateways.
3. Third-party Sharing: We never sell your data. We only share necessary info with delivery partners.
4. Security: We use AES-256 encryption to protect your personal information.`
  },
  'terms-and-conditions': {
    title: 'Terms and Conditions',
    icon: FileText,
    content: `By using AmanaMart, you agree to comply with our platform rules.

1. Account Eligibility: You must be 18+ to use certain modules like Pharmacy.
2. User Conduct: No fraudulent orders or misleading ads in the Classifieds module.
3. Pricing: We strive for accuracy, but errors in pricing may be corrected after an order is placed.
4. Termination: We reserve the right to suspend accounts that violate our safety guidelines.`
  },
  'refund-policy': {
    title: 'Refund & Return Policy',
    icon: RefreshCcw,
    content: `We ensure a hassle-free refund process.
    
- Grocery: Return items within 1 hour if quality is unsatisfactory.
- Pharmacy: Medicines are non-returnable unless the wrong item was delivered.
- Shop (Electronics): 7-day easy return for manufacturing defects.
- Food: Refunds are processed if the food is stale or significantly delayed.
- Classifieds: AmanaMart is not responsible for transactions between private buyers and sellers.`
  },
  'shipping-policy': {
    title: 'Shipping & Delivery Policy',
    icon: Truck,
    content: `Fast delivery is our promise.

- Instant Delivery (Food/Pharmacy): 30-45 minutes.
- Express Delivery (Grocery): 60-90 minutes.
- Standard Shipping (Shop): 2-5 business days across Bangladesh.
- Courier: Pickup within 2 hours; delivery same day or next day depending on distance.`
  },

  // Module Specific
  'grocery-policy': {
    title: 'Grocery Module Policy',
    icon: ShoppingCart,
    content: `Freshness guaranteed or money back.
    
1. Quality Check: Our pickers select the freshest items for you.
2. Substitution: If an item is out of stock, we will call you for a suitable replacement.
3. Delivery Slots: Choose from various time slots that suit your schedule.
4. Perishables: Fruits and vegetables must be checked at the time of delivery.`
  },
  'pharmacy-policy': {
    title: 'Pharmacy & Health Policy',
    icon: Activity,
    content: `AmanaMart Pharmacy operates under strict DGDA guidelines.
    
1. Prescription Upload: Prescriptions are mandatory for Schedule-H drugs.
2. Pharmacist Review: Every medical order is reviewed by a certified pharmacist.
3. Storage: Medicines are stored and transported under temperature-controlled conditions.
4. Safety: We do not provide narcotics or restricted substances.`
  },
  'food-safety': {
    title: 'Food Safety Standards',
    icon: Heart,
    content: `We partner only with hygiene-certified restaurants.
    
1. Packaging: Food is delivered in tamper-evident packaging.
2. Delivery Heat-bags: We use thermal bags to keep your food hot and fresh.
3. Ratings: User reviews help us maintain high-quality restaurant partners.
4. Hygiene: All riders follow strict sanitation protocols.`
  },
  'courier-policy': {
    title: 'Courier & Logistics Rules',
    icon: Package,
    content: `Send parcels safely with Amana Courier.
    
1. Prohibited Items: No flammable materials, illegal drugs, or high-value currency.
2. Weight Limits: Standard parcels up to 20kg. For heavy items, contact support.
3. Liability: We provide insurance up to ৳5,000 for lost or damaged parcels.
4. Tracking: Real-time GPS tracking for every delivery.`
  },
  'classified-safety': {
    title: 'Classifieds Safety Tips',
    icon: Shield,
    content: `Buy and sell safely in our local marketplace.
    
1. Meet in Public: Always choose a safe, busy location for handovers.
2. Inspection: Check the product thoroughly before paying.
3. No Advance Pay: Never send money to a seller before seeing the item.
4. Verified Sellers: Look for the blue checkmark for trusted sellers.`
  },

  // Vendor & Partner
  'vendor-agreement': {
    title: 'Vendor Agreement',
    icon: Users,
    content: `Join Bangladesh's fastest-growing marketplace.
    
- Commission: Competitive rates per module.
- Payouts: Weekly settlements directly to your bank account.
- Visibility: Reach millions of customers with our advanced SEO.
- Tools: Use the Amana Business Panel to track sales and stock.`
  },
  'rider-conduct': {
    title: 'Delivery Partner Conduct',
    icon: Car,
    content: `Our riders are the face of AmanaMart.
    
- Punctuality: Timely delivery is essential.
- Etiquette: Respectful behavior towards customers and vendors.
- Safety: Mandatory helmet and traffic rule compliance.
- Earnings: Transparent per-delivery payment and weekly bonuses.`
  }
};

export default function CMSPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Find page or generate fallback for 100+ pages simulation
  const page = CMS_CONTENT[slug] || { 
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), 
    icon: HelpCircle, 
    content: `Detailed information about ${slug.replace(/-/g, ' ')} is being updated. 

At AmanaMart, we are committed to transparency and clarity for all our stakeholders. This page will soon contain full documentation regarding our policies, guidelines, and standards for this specific section.

In the meantime, if you have urgent questions, please reach out to our support team at care@amanamart.com.`
  };

  const Icon = page.icon;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-gray-50 border-b border-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-8 shadow-xl shadow-primary/5">
            <Icon size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">{page.title}</h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">AmanaMart Official Policy Document</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-[48px] border border-gray-100 p-8 md:p-16 shadow-2xl shadow-gray-200/50">
            <div className="text-gray-600 font-medium leading-relaxed whitespace-pre-line text-lg">
              {page.content}
            </div>
          </div>
        </div>

        {/* Dynamic Help Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 group hover:border-primary transition-all cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary mb-6 shadow-lg group-hover:bg-primary group-hover:text-white transition-all">
              <HelpCircle size={24} />
            </div>
            <h4 className="font-black text-gray-900 mb-2">Still Unclear?</h4>
            <p className="text-xs text-gray-500 mb-4">Our support team is available 24/7 to help you.</p>
            <span className="text-primary font-black text-[10px] uppercase tracking-widest">Support Center</span>
          </div>
          <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 group hover:border-green-500 transition-all cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-500 mb-6 shadow-lg group-hover:bg-green-500 group-hover:text-white transition-all">
              <Shield size={24} />
            </div>
            <h4 className="font-black text-gray-900 mb-2">Data Security</h4>
            <p className="text-xs text-gray-500 mb-4">We use enterprise-grade encryption for all data.</p>
            <span className="text-green-600 font-black text-[10px] uppercase tracking-widest">Security Policy</span>
          </div>
          <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 group hover:border-amber-500 transition-all cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-500 mb-6 shadow-lg group-hover:bg-amber-500 group-hover:text-white transition-all">
              <CreditCard size={24} />
            </div>
            <h4 className="font-black text-gray-900 mb-2">Safe Payments</h4>
            <p className="text-xs text-gray-500 mb-4">All transactions are protected by SSLCommerz.</p>
            <span className="text-amber-600 font-black text-[10px] uppercase tracking-widest">Payment Info</span>
          </div>
        </div>

        {/* Policy Footer */}
        <div className="mt-24 pt-12 border-t border-gray-100 text-center">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">AmanaMart Professional Ecosystem</p>
           <p className="text-xs text-gray-400 font-medium max-w-lg mx-auto">
             These policies are subject to change without prior notice. Please check this page regularly for updates. Last updated: April 2026.
           </p>
        </div>
      </div>
    </main>
  );
}

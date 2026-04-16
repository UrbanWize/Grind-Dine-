import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShoppingBag, ExternalLink, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
  {
    name: 'Sistema Lunch Cube',
    bestFor: 'Everyday office worker — 4 leak-proof compartments, easy to clean',
    price: 'KES 800–1,200',
    where: 'Naivas, Carrefour, Zucchini'
  },
  {
    name: 'Lock & Lock Rectangle',
    bestFor: 'Meal preppers — airtight seal, great for rice + stew',
    price: 'KES 500–900',
    where: 'Naivas, Chandarana, Tuskys'
  },
  {
    name: 'Tupperware Lunch Set',
    bestFor: 'Variety lovers — multiple sizes, family-vibe offices',
    price: 'KES 1,500–2,500',
    where: 'Tupperware Kenya agents, Jumia'
  },
  {
    name: 'Simple Fabric Carrier',
    bestFor: 'First-timers — lightweight, fits any container, easy to wash',
    price: 'KES 200–500',
    where: 'Gikomba, City Market, local stores'
  },
  {
    name: 'Thermal Insulated Bag',
    bestFor: 'Long commuters — keeps food warm or cold for 4+ hours',
    price: 'KES 600–1,200',
    where: 'Naivas, Carrefour, Jumia, Kilimall'
  },
  {
    name: 'Bento Box',
    bestFor: 'Variety lovers — separate sections prevent mixing, portion-friendly',
    price: 'KES 700–1,500',
    where: 'Carrefour, Zucchini, online'
  }
];

export default function StarterKitPage() {
  const handleViewDetails = (productName: string) => {
    const query = encodeURIComponent(`${productName} price Nairobi Kenya`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-dark">Want to start your lunch packing journey?</h1>
        <p className="text-xl text-primary font-medium">Let us show you the way. 🍱</p>
        <p className="text-text-secondary max-w-xl mx-auto">
          The right lunch box makes all the difference. Here are our top picks — all available from local Nairobi stores — to get you started today.
        </p>
      </section>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {PRODUCTS.map((product, i) => (
          <Card key={i} className="card-shadow border-border-soft overflow-hidden flex flex-col">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-xl text-primary-dark">{product.name}</CardTitle>
              <CardDescription className="font-bold text-primary">{product.price}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">Best For</p>
                <p className="text-text-primary">{product.bestFor}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">Where to Buy</p>
                <p className="text-text-primary">{product.where}</p>
              </div>
              <Button 
                variant="outline" 
                className="w-full rounded-button"
                onClick={() => handleViewDetails(product.name)}
              >
                View Details <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Section */}
      <section className="bg-white p-8 rounded-[32px] card-shadow border border-border-soft space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Info className="text-primary w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-primary-dark">First-Timer Tips</h2>
        </div>
        <ul className="space-y-4">
          {[
            'Start with a simple fabric bag — don\'t over-invest before the habit is built.',
            'Get at least 2 compartments to keep wet and dry food separate.',
            'Bright-colored bags are your best friend on a rushed Nairobi morning.',
            'A thermal bag protects you if meetings push your lunch to 2pm.'
          ].map((tip, i) => (
            <li key={i} className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-text-primary">{tip}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="text-center">
        <Link to="/login">
          <Button size="lg" className="h-14 px-12 text-lg rounded-button">
            Start Packing — It's Free →
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { Leaf, Droplet, Sparkles, Shield } from 'lucide-react';

const ingredients = [
  {
    icon: Leaf,
    name: 'Botanical Extracts',
    description: 'Carefully selected plant-based ingredients for gentle yet effective care'
  },
  {
    icon: Droplet,
    name: 'Hyaluronic Acid',
    description: 'Deep hydration that penetrates multiple layers of skin'
  },
  {
    icon: Sparkles,
    name: 'Vitamin C',
    description: 'Powerful antioxidant for brightening and anti-aging benefits'
  },
  {
    icon: Shield,
    name: 'Natural Peptides',
    description: 'Advanced formulation to boost collagen production naturally'
  }
];

export function Ingredients() {
  return (
    <section id="ingredients" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-muted-foreground mb-4">
            WHAT WE USE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Premium Ingredients
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Every ingredient is carefully sourced and scientifically proven
            to deliver exceptional results
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg hover:bg-neutral-50 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-neutral-100">
                <ingredient.icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg">{ingredient.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {ingredient.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Users, Star, ArrowRight, Flower } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-wellness.jpg";
import lotusIcon from "@/assets/lotus-icon.png";

const Landing = () => {
  const therapyTypes = [
    { name: "Basti", description: "Medicated enema therapy", icon: "🌿" },
    { name: "Nasya", description: "Nasal therapy", icon: "🌸" },
    { name: "Vamana", description: "Therapeutic vomiting", icon: "🍃" },
    { name: "Virechana", description: "Purgation therapy", icon: "🌺" },
    { name: "Raktamokshana", description: "Blood purification", icon: "💧" },
  ];

  const benefits = [
    { title: "Expert Practitioners", description: "Certified Ayurvedic therapists", icon: Users },
    { title: "Personalized Care", description: "ML-powered recommendations", icon: Heart },
    { title: "Easy Scheduling", description: "Book sessions seamlessly", icon: Calendar },
    { title: "Proven Results", description: "Traditional wisdom, modern approach", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={lotusIcon} alt="AyurSutra" className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-foreground">AyurSutra</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#therapies" className="text-muted-foreground hover:text-foreground transition-colors">Therapies</a>
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">Benefits</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/70"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Ancient Wisdom,<br />
              <span className="text-primary">Modern Wellness</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience authentic Panchakarma therapy with personalized care and intelligent scheduling
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?type=patient">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Users className="mr-2" />
                  Patient Login
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/auth?type=practitioner">
                <Button variant="wellness" size="xl" className="w-full sm:w-auto">
                  <Flower className="mr-2" />
                  Practitioner Login
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Therapies Section */}
      <section id="therapies" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Panchakarma Therapies
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Five sacred cleansing procedures to restore balance and vitality
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {therapyTypes.map((therapy) => (
              <Card key={therapy.name} className="shadow-card hover:shadow-wellness transition-all duration-300 hover:scale-[1.02] border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{therapy.icon}</div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">{therapy.name}</h4>
                  <p className="text-muted-foreground">{therapy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose AyurSutra?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern technology meets ancient wisdom for optimal wellness
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="bg-secondary/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-soft">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h4>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Begin Your Wellness Journey
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Take the first step towards holistic healing and balanced living
            </p>
            <Link to="/auth?type=patient">
              <Button variant="wellness" size="xl">
                <Calendar className="mr-2" />
                Schedule Your First Session
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={lotusIcon} alt="AyurSutra" className="h-6 w-6" />
            <span className="text-lg font-semibold text-foreground">AyurSutra</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 AyurSutra. Bringing ancient wisdom to modern wellness.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
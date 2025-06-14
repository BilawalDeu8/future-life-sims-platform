
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, Sparkles, Clock, Heart, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-yellow-400 mr-3 animate-pulse" />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-semibold text-lg">
              THE NEXT BIG THING IN LIFE PLANNING
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            Don't Just Plan Your Future
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Live It First
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Experience what your life would actually look like in different career paths. 
            See where you'd live, how you'd spend your days, your stress levels, relationships, 
            and major milestones - before making the decision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Your Future Simulation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="text-sm text-blue-200 opacity-80">
            Join 50,000+ students already simulating their futures
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <div className="w-6 h-6 bg-purple-400 rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-300">
          <div className="w-5 h-5 bg-pink-400 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Revolutionary Concept Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              This Isn't Career Planning
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              It's life simulation. Experience complete lifestyle scenarios, not just job descriptions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-white">Live Your Day</h3>
                <p className="text-blue-100">
                  Experience what a typical Tuesday would look like as a software engineer vs. a teacher vs. an entrepreneur
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-white">Feel Your Lifestyle</h3>
                <p className="text-blue-100">
                  See your stress levels, social life, where you'd live, and how you'd spend weekends in each path
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-white">Project Your Milestones</h3>
                <p className="text-blue-100">
                  When you'd buy a house, travel, start a family, or achieve financial freedom in each scenario
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preview Scenarios Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Preview Your Possible Lives
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Each simulation shows you the complete picture - not just work, but life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Tech Entrepreneur Path",
                location: "San Francisco Bay Area",
                lifestyle: "High stress, high reward",
                dailyLife: "Coffee meetings, late coding sessions",
                gradient: "from-green-400 to-blue-500"
              },
              {
                title: "Creative Designer Path",
                location: "Brooklyn, New York", 
                lifestyle: "Balanced creativity & stability",
                dailyLife: "Studio time, client presentations",
                gradient: "from-purple-400 to-pink-500"
              },
              {
                title: "Environmental Scientist Path",
                location: "Portland, Oregon",
                lifestyle: "Purpose-driven, outdoorsy",
                dailyLife: "Field research, lab analysis",
                gradient: "from-green-500 to-teal-500"
              }
            ].map((scenario, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className={`h-24 rounded-lg bg-gradient-to-r ${scenario.gradient} mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <Play className="h-8 w-8 text-white opacity-80" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{scenario.title}</h3>
                  <div className="space-y-2 text-sm text-blue-100">
                    <p><span className="text-blue-300">📍</span> {scenario.location}</p>
                    <p><span className="text-blue-300">⚖️</span> {scenario.lifestyle}</p>
                    <p><span className="text-blue-300">📅</span> {scenario.dailyLife}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-purple-300 hover:text-white hover:bg-purple-600/30"
                  >
                    Experience This Life
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Ready to Experience Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Stop guessing about your future. Start living it. Create your first life simulation in under 5 minutes.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Your Future Simulation
            <Sparkles className="ml-3 h-6 w-6" />
          </Button>
          
          <p className="text-sm text-blue-200 mt-6 opacity-80">
            Free to start • No credit card required • Unlimited simulations
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;

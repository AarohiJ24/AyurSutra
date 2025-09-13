import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flower, User, UserCheck, ArrowLeft } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import lotusIcon from "@/assets/lotus-icon.png";
import mandalaBg from "@/assets/mandala-bg.jpg";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userType = searchParams.get("type") || "patient";
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - navigate to appropriate dashboard
    if (userType === "patient") {
      navigate("/patient-dashboard");
    } else {
      navigate("/practitioner-dashboard");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup - navigate to appropriate dashboard
    if (userType === "patient") {
      navigate("/patient-dashboard");
    } else {
      navigate("/practitioner-dashboard");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-subtle bg-cover bg-center"
      style={{ backgroundImage: `url(${mandalaBg})` }}
    >
      <div className="absolute inset-0 bg-background/80"></div>
      
      <div className="relative w-full max-w-lg mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={lotusIcon} alt="AyurSutra" className="h-10 w-10" />
            <h1 className="text-3xl font-bold text-foreground">AyurSutra</h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            {userType === "patient" ? (
              <User className="h-5 w-5 text-primary" />
            ) : (
              <UserCheck className="h-5 w-5 text-primary" />
            )}
            <h2 className="text-xl font-semibold text-foreground">
              {userType === "patient" ? "Patient Portal" : "Practitioner Portal"}
            </h2>
          </div>
          <p className="text-muted-foreground">
            {userType === "patient" 
              ? "Access your wellness journey" 
              : "Manage your practice"}
          </p>
        </div>

        <Card className="shadow-wellness border-border/50 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Sign Up
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder={userType === "patient" ? "patient@example.com" : "practitioner@example.com"}
                      type="email"
                      required
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="wellness"
                    size="lg"
                  >
                    <Flower className="mr-2 h-4 w-4" />
                    Login to {userType === "patient" ? "Patient" : "Practitioner"} Portal
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input
                      id="signupEmail"
                      placeholder={userType === "patient" ? "patient@example.com" : "practitioner@example.com"}
                      type="email"
                      required
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input
                      id="signupPassword"
                      type="password"
                      required
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  {userType === "practitioner" && (
                    <div className="space-y-2">
                      <Label htmlFor="license">License Number</Label>
                      <Input
                        id="license"
                        placeholder="Ayurvedic license number"
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="wellness"
                    size="lg"
                  >
                    <Flower className="mr-2 h-4 w-4" />
                    Create {userType === "patient" ? "Patient" : "Practitioner"} Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>
                {userType === "patient" ? "Are you a practitioner?" : "Are you a patient?"}{" "}
                <Link 
                  to={`/auth?type=${userType === "patient" ? "practitioner" : "patient"}`}
                  className="text-primary hover:underline"
                >
                  Switch here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
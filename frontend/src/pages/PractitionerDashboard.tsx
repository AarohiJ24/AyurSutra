import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, User, Star, TrendingUp, Users, Activity, LogOut, Plus, Eye, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import lotusIcon from "@/assets/lotus-icon.png";
import mandalaBg from "@/assets/mandala-bg.jpg";

const PractitionerDashboard = () => {
  const [selectedView, setSelectedView] = useState("overview");

  const todayStats = {
    totalSessions: 8,
    completedSessions: 5,
    upcomingSessions: 3,
    cancelledSessions: 0
  };

  const todayAppointments = [
    { 
      id: 1, 
      time: "09:00 AM", 
      patient: "Khushi", 
      therapy: "Basti", 
      duration: "60 min", 
      status: "completed", 
      notes: "Patient responded well to treatment" 
    },
    { 
      id: 2, 
      time: "10:30 AM", 
      patient: "Aaradhya", 
      therapy: "Nasya", 
      duration: "45 min", 
      status: "completed", 
      notes: "First session, good tolerance" 
    },
    { 
      id: 3, 
      time: "12:00 PM", 
      patient: "Rishika", 
      therapy: "Virechana", 
      duration: "90 min", 
      status: "completed", 
      notes: "Excellent progress, continue current protocol" 
    },
    { 
      id: 4, 
      time: "02:00 PM", 
      patient: "Aarohi", 
      therapy: "Basti", 
      duration: "75 min", 
      status: "upcoming", 
      notes: "Second session in treatment series" 
    },
    { 
      id: 5, 
      time: "03:30 PM", 
      patient: "Priyanshi", 
      therapy: "Raktamokshana", 
      duration: "60 min", 
      status: "upcoming", 
      notes: "Follow-up session for skin condition" 
    },
    { 
      id: 6, 
      time: "05:00 PM", 
      patient: "Jahanvi", 
      therapy: "Nasya", 
      duration: "45 min", 
      status: "upcoming", 
      notes: "Initial consultation and assessment" 
    }
  ];

  const weeklyStats = {
    totalPatients: 32,
    newPatients: 8,
    averageRating: 4.8,
    completionRate: 95
  };

  const recentPatients = [
    { name: "Khushi", therapy: "Basti Series", progress: 80, sessions: "5/6", nextSession: "Jan 25" },
    { name: "Aaradhya", therapy: "Respiratory Package", progress: 45, sessions: "3/8", nextSession: "Jan 24" },
    { name: "Aarohi", therapy: "Detox Program", progress: 90, sessions: "8/9", nextSession: "Jan 26" },
    { name: "Rishika", therapy: "Digestive Wellness", progress: 30, sessions: "2/7", nextSession: "Jan 25" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle relative">
      <div 
        className="absolute inset-0 opacity-[0.15] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mandalaBg})` }}
      />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={lotusIcon} alt="AyurSutra" className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-foreground">AyurSutra</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-foreground font-medium">Dr. Priya Sharma</span>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, Dr. Sharma!</h2>
          <p className="text-muted-foreground">Manage your practice and help patients on their wellness journey</p>
        </div>

        <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Today's Schedule</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Today's Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-wellness border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Today's Sessions</p>
                      <p className="text-2xl font-bold text-foreground">{todayStats.totalSessions}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Completed</p>
                      <p className="text-2xl font-bold text-foreground">{todayStats.completedSessions}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Upcoming</p>
                      <p className="text-2xl font-bold text-foreground">{todayStats.upcomingSessions}</p>
                    </div>
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Rating</p>
                      <p className="text-2xl font-bold text-foreground">{weeklyStats.averageRating}</p>
                    </div>
                    <Star className="h-8 w-8 text-primary fill-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Next Appointments */}
              <div className="lg:col-span-2">
                <Card className="shadow-wellness border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Next Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todayAppointments.filter(apt => apt.status === 'upcoming').slice(0, 3).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-hero/10 border border-primary/20">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 rounded-full p-2">
                              <Clock className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{appointment.patient}</h4>
                              <p className="text-sm text-muted-foreground">{appointment.therapy} • {appointment.duration}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">{appointment.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Overview */}
              <div>
                <Card className="shadow-wellness border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Week Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Patients</span>
                        <span className="font-semibold text-foreground">{weeklyStats.totalPatients}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">New Patients</span>
                        <span className="font-semibold text-foreground">{weeklyStats.newPatients}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Completion Rate</span>
                        <span className="font-semibold text-primary">{weeklyStats.completionRate}%</span>
                      </div>
                      <div className="bg-secondary/30 rounded-full h-2 mt-4">
                        <div className="bg-gradient-wellness h-2 rounded-full" style={{ width: `${weeklyStats.completionRate}%` }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card className="shadow-wellness border-border/50">
              <CardHeader>
                <CardTitle>Today's Schedule - January 23, 2024</CardTitle>
                <CardDescription>
                  Manage your appointments and patient sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className={`p-4 rounded-lg border transition-all duration-200 ${
                      appointment.status === 'completed' 
                        ? 'bg-accent/20 border-accent/50' 
                        : appointment.status === 'upcoming'
                        ? 'bg-primary/10 border-primary/20'
                        : 'bg-destructive/10 border-destructive/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="font-semibold text-foreground">{appointment.time}</p>
                            <p className="text-sm text-muted-foreground">{appointment.duration}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{appointment.patient}</h4>
                            <p className="text-sm text-muted-foreground">{appointment.therapy}</p>
                            {appointment.notes && (
                              <p className="text-xs text-muted-foreground mt-1">{appointment.notes}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={appointment.status === 'completed' ? 'secondary' : appointment.status === 'upcoming' ? 'default' : 'destructive'}
                            className={
                              appointment.status === 'completed' 
                                ? 'bg-accent text-accent-foreground'
                                : appointment.status === 'upcoming'
                                ? 'bg-primary text-primary-foreground' 
                                : ''
                            }
                          >
                            {appointment.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {appointment.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="shadow-wellness border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Patient Management
                </CardTitle>
                <CardDescription>
                  Track your patients' progress and treatment plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPatients.map((patient, index) => (
                    <div key={index} className="p-4 rounded-lg bg-card border border-border/50 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-foreground">{patient.name}</h4>
                            <p className="text-sm text-muted-foreground">{patient.therapy}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Next: {patient.nextSession}</p>
                          <p className="text-sm font-medium text-foreground">Sessions: {patient.sessions}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Treatment Progress</span>
                          <span className="font-medium text-foreground">{patient.progress}%</span>
                        </div>
                        <div className="bg-secondary/30 rounded-full h-2">
                          <div 
                            className="bg-gradient-wellness h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${patient.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-wellness border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Practice Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-4">Most Popular Therapies</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Basti Therapy</span>
                          <div className="flex items-center gap-2">
                            <div className="bg-secondary/30 rounded-full h-2 w-20">
                              <div className="bg-gradient-wellness h-2 rounded-full" style={{ width: "85%" }}></div>
                            </div>
                            <span className="text-sm font-medium text-foreground">85%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Virechana</span>
                          <div className="flex items-center gap-2">
                            <div className="bg-secondary/30 rounded-full h-2 w-20">
                              <div className="bg-gradient-wellness h-2 rounded-full" style={{ width: "70%" }}></div>
                            </div>
                            <span className="text-sm font-medium text-foreground">70%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Nasya</span>
                          <div className="flex items-center gap-2">
                            <div className="bg-secondary/30 rounded-full h-2 w-20">
                              <div className="bg-gradient-wellness h-2 rounded-full" style={{ width: "60%" }}></div>
                            </div>
                            <span className="text-sm font-medium text-foreground">60%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border/50">
                <CardHeader>
                  <CardTitle>Patient Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{weeklyStats.averageRating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground">Average Rating</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Recent Feedback</h4>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-gradient-hero/10 border border-primary/20">
                          <p className="text-sm text-muted-foreground italic">"Excellent treatment and care. Dr. Sharma is very knowledgeable."</p>
                          <p className="text-xs text-muted-foreground mt-1">- John D.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-hero/10 border border-primary/20">
                          <p className="text-sm text-muted-foreground italic">"The Basti therapy has significantly improved my digestion."</p>
                          <p className="text-xs text-muted-foreground mt-1">- Sarah J.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PractitionerDashboard;

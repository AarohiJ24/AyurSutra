import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar as CalendarIcon, Clock, User, Star, TrendingUp, Flower, LogOut, Plus, MapPin, Phone, AlertCircle, ChevronDown, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import lotusIcon from "@/assets/lotus-icon.png";
import mandalaBg from "@/assets/mandala-bg.jpg";

interface TherapyType {
  id: string;
  name: string;
  description: string;
  duration: string;
  recommended: boolean;
}

interface Practitioner {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  available: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface SessionRating {
  sessionId: string;
  rating: number;
  feedback: string;
}

interface Session {
  id: string;
  date: string;
  therapy: string;
  practitioner: string;
  status: string;
  rating: number;
  feedback?: string;
}

const PatientDashboard = () => {
  const { toast } = useToast();
  const [selectedTherapy, setSelectedTherapy] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPractitioner, setSelectedPractitioner] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [sessionRatings, setSessionRatings] = useState<Record<string, SessionRating>>({});
  const [expandedSessions, setExpandedSessions] = useState<Record<string, boolean>>({});


  const therapyTypes: TherapyType[] = [
    { 
      id: "basti", 
      name: "Basti", 
      description: "Medicated enema therapy for digestive wellness and detoxification", 
      duration: "60-90 min",
      recommended: true 
    },
    { 
      id: "nasya", 
      name: "Nasya", 
      description: "Nasal therapy for respiratory health and mental clarity", 
      duration: "30-45 min",
      recommended: false 
    },
    { 
      id: "vamana", 
      name: "Vamana", 
      description: "Therapeutic cleansing for respiratory and digestive issues", 
      duration: "2-3 hours",
      recommended: false 
    },
    { 
      id: "virechana", 
      name: "Virechana", 
      description: "Purification therapy for liver health and detoxification", 
      duration: "1-2 hours",
      recommended: true 
    },
    { 
      id: "raktamokshana", 
      name: "Raktamokshana", 
      description: "Blood purification therapy for skin and circulatory health", 
      duration: "45-60 min",
      recommended: false 
    },
  ];

  const practitioners: Practitioner[] = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      specialization: "Panchakarma Specialist",
      experience: "15 years",
      rating: 4.9,
      available: true
    },
    {
      id: "2", 
      name: "Dr. Rajesh Patel",
      specialization: "Digestive Health Expert",
      experience: "12 years",
      rating: 4.8,
      available: true
    },
    {
      id: "3",
      name: "Dr. Meera Reddy",
      specialization: "Respiratory Therapies",
      experience: "10 years", 
      rating: 4.7,
      available: false
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: "09:00 AM", available: true },
    { time: "10:30 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "01:30 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:30 PM", available: false },
    { time: "06:00 PM", available: true }
  ];

  const upcomingSession = {
    date: "2025-09-19",
    time: "10:00 AM",
    therapy: "Basti",
    practitioner: "Dr. Priya Sharma",
    location: "Wellness Center - Room 3"
  };

  const recentSessions: Session[] = [
    { id: "session-1", date: "2025-09-18", therapy: "Basti", practitioner: "Dr. Priya Sharma", status: "Completed", rating: 5, feedback: "" },
    { id: "session-2", date: "2025-09-11", therapy: "Virechana", practitioner: "Dr. Priya Sharma", status: "Completed", rating: 4, feedback: "" },
    { id: "session-3", date: "2025-09-04", therapy: "Basti", practitioner: "Dr. Priya Sharma", status: "Completed", rating: 5, feedback: "" },
  ];

  const mlRecommendations = [
    {
      therapy: "Basti",
      confidence: 92,
      reason: "Based on your progress and constitution, continuing Basti therapy will help maintain digestive balance"
    },
    {
      therapy: "Virechana", 
      confidence: 78,
      reason: "Your recent sessions show good response to purification therapies"
    }
  ];

  const handleBooking = () => {
    if (!selectedTherapy || !selectedDate || !selectedTime || !selectedPractitioner) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields to book your session.",
      });
      return;
    }

    const selectedTherapyDetails = therapyTypes.find(t => t.id === selectedTherapy);
    const selectedPractitionerDetails = practitioners.find(p => p.id === selectedPractitioner);

    toast({
      title: "Session Booked Successfully!",
      description: `Your ${selectedTherapyDetails?.name} session with ${selectedPractitionerDetails?.name} on ${selectedDate.toDateString()} at ${selectedTime} has been confirmed.`,
    });

    // Reset form
    setSelectedTherapy("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setSelectedPractitioner("");
    setNotes("");
    setIsBookingOpen(false);
    setIsContactModalOpen(false);
    setIsRescheduleModalOpen(false);
    setNewDate("");
    setNewTime("");
  };

  const selectedTherapyDetails = therapyTypes.find(t => t.id === selectedTherapy);

   const handleRatingChange = (sessionId: string, newRating: number) => {
    setSessionRatings(prev => ({
      ...prev,
      [sessionId]: {
        sessionId,
        rating: newRating,
        feedback: prev[sessionId]?.feedback || ""
      }
    }));
  };

  const handleFeedbackChange = (sessionId: string, feedback: string) => {
    setSessionRatings(prev => ({
      ...prev,
      [sessionId]: {
        sessionId,
        rating: prev[sessionId]?.rating || 0,
        feedback
      }
    }));
  };

  const handleSaveRatingFeedback = (sessionId: string) => {
    const ratingData = sessionRatings[sessionId];
    if (ratingData && ratingData.rating > 0) {
      toast({
        title: "Rating Saved",
        description: "Your rating and feedback have been saved successfully.",
      });
      // Here you would typically save to your backend
    } else {
      toast({
        title: "Please provide a rating",
        description: "Please select a star rating before saving.",
      });
    }
  };

  const toggleSessionExpansion = (sessionId: string) => {
    setExpandedSessions(prev => ({
      ...prev,
      [sessionId]: !prev[sessionId]
    }));
  };

  const StarRating = ({ sessionId, currentRating }: { sessionId: string, currentRating: number }) => {
    const sessionRating = sessionRatings[sessionId]?.rating || currentRating;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 cursor-pointer transition-colors ${
              i < sessionRating 
                ? "text-primary fill-primary hover:text-primary/80" 
                : "text-muted-foreground hover:text-primary/50"
            }`}
            onClick={() => handleRatingChange(sessionId, i + 1)}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-2">
          {sessionRating > 0 ? `${sessionRating}/5` : "Rate this session"}
        </span>
      </div>
    );
  };

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
              <span className="text-foreground font-medium">Khushi</span>
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
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Khushi!</h2>
          <p className="text-muted-foreground">Continue your wellness journey with personalized Panchakarma therapy</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Session */}
            <Card className="shadow-wellness border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Next Appointment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-hero/10 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">{upcomingSession.therapy} Therapy</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{upcomingSession.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{upcomingSession.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{upcomingSession.practitioner}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{upcomingSession.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsRescheduleModalOpen(true)}>
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setIsContactModalOpen(true)}>
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Schedule New Session */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Schedule New Session
                </CardTitle>
                <CardDescription>
                  Book your next Panchakarma therapy session with our certified practitioners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {therapyTypes.map((therapy) => (
                    <div
                      key={therapy.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedTherapy === therapy.id
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border hover:border-primary/50 hover:bg-accent/20"
                      }`}
                      onClick={() => setSelectedTherapy(therapy.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{therapy.name}</h4>
                        {therapy.recommended && (
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            <Star className="h-3 w-3 mr-1" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{therapy.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{therapy.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="wellness" 
                        disabled={!selectedTherapy}
                        className="flex-1"
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Book {selectedTherapy ? therapyTypes.find(t => t.id === selectedTherapy)?.name : "Therapy"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Book Your {selectedTherapyDetails?.name} Session</DialogTitle>
                        <DialogDescription>
                          Complete the details below to schedule your therapy session.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-6 py-4">
                        {/* Therapy Summary */}
                        {selectedTherapyDetails && (
                          <div className="bg-gradient-hero/10 rounded-lg p-4 border border-primary/20">
                            <h4 className="font-medium text-foreground mb-2">{selectedTherapyDetails.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{selectedTherapyDetails.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Duration: {selectedTherapyDetails.duration}</span>
                            </div>
                          </div>
                        )}

                        {/* Date Selection */}
                        <div className="space-y-3">
                          <Label>Select Date</Label>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="rounded-md border border-border"
                          />
                        </div>

                        {/* Time Selection */}
                        <div className="space-y-3">
                          <Label>Available Time Slots</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((slot) => (
                              <Button
                                key={slot.time}
                                variant={selectedTime === slot.time ? "default" : "outline"}
                                className={`${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={!slot.available}
                                onClick={() => slot.available && setSelectedTime(slot.time)}
                              >
                                {slot.time}
                                {!slot.available && <AlertCircle className="ml-2 h-3 w-3" />}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Practitioner Selection */}
                        <div className="space-y-3">
                          <Label>Choose Practitioner</Label>
                          <Select value={selectedPractitioner} onValueChange={setSelectedPractitioner}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a practitioner" />
                            </SelectTrigger>
                            <SelectContent>
                              {practitioners.map((practitioner) => (
                                <SelectItem 
                                  key={practitioner.id} 
                                  value={practitioner.id}
                                  disabled={!practitioner.available}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    <div>
                                      <div className="font-medium">{practitioner.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {practitioner.specialization} • {practitioner.experience}
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1 ml-4">
                                      <Star className="h-3 w-3 fill-primary text-primary" />
                                      <span className="text-sm">{practitioner.rating}</span>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Additional Notes */}
                        <div className="space-y-3">
                          <Label htmlFor="notes">Additional Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Any specific concerns or preferences..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="wellness" onClick={handleBooking}>
                          Confirm Booking
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Your therapy history and progress - Rate and review your completed sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="border border-border/30 rounded-lg overflow-hidden">
                      <Collapsible 
                        open={expandedSessions[session.id]} 
                        onOpenChange={() => toggleSessionExpansion(session.id)}
                      >
                        <div className="flex items-center justify-between p-4 bg-secondary/20">
                          <div className="flex items-center gap-4">
                            <div className="bg-primary/10 rounded-full p-2">
                              <Flower className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{session.therapy}</h4>
                              <p className="text-sm text-muted-foreground">{session.date} • {session.practitioner}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="bg-accent text-accent-foreground">
                              {session.status}
                            </Badge>
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronDown className={`h-4 w-4 transition-transform ${
                                  expandedSessions[session.id] ? "rotate-180" : ""
                                }`} />
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                        </div>
                        
                        <CollapsibleContent>
                          <div className="p-4 bg-card border-t border-border/30 space-y-4">
                            {/* Interactive Rating */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                Rate this session
                              </Label>
                              <StarRating sessionId={session.id} currentRating={session.rating} />
                            </div>
                            
                            {/* Feedback Section */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Your feedback
                              </Label>
                              <Textarea
                                placeholder="Share your experience with this therapy session..."
                                value={sessionRatings[session.id]?.feedback || session.feedback || ""}
                                onChange={(e) => handleFeedbackChange(session.id, e.target.value)}
                                rows={3}
                                className="resize-none"
                              />
                            </div>
                            
                            {/* Save Button */}
                            <div className="flex justify-end">
                              <Button
                                variant="wellness"
                                size="sm"
                                onClick={() => handleSaveRatingFeedback(session.id)}
                                disabled={!sessionRatings[session.id]?.rating}
                              >
                                Save Rating & Feedback
                              </Button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* ML Recommendations */}
            <Card className="shadow-wellness border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized therapy suggestions based on your progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mlRecommendations.map((rec, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gradient-hero/10 border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{rec.therapy}</h4>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {rec.confidence}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Wellness Stats */}
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle>Wellness Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sessions Completed</span>
                    <span className="font-semibold text-foreground">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Current Streak</span>
                    <span className="font-semibold text-foreground">8 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Next Milestone</span>
                    <span className="font-semibold text-primary">30 sessions</span>
                  </div>
                  <div className="bg-secondary/30 rounded-full h-2 mt-4">
                    <div className="bg-gradient-wellness h-2 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">6 sessions to go!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Practitioner Contact Details</h3>
            <p><strong>Name:</strong> {upcomingSession.practitioner}</p>
            <p><strong>Email:</strong> dr.priya.sharma@wellnesscenter.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>

            <div className="flex justify-end mt-4">
              <Button variant="destructive" onClick={() => setIsContactModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )} 
      {isRescheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Reschedule Therapy Session</h3>

            <div className="flex flex-col gap-4 mb-4">
              <label>
                New Date:
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </label>

              <label>
                New Time:
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRescheduleModalOpen(false)}>Cancel</Button>
              <Button
                variant="default"
                disabled={!newDate || !newTime}
                onClick={() => {
                  console.log(`Rescheduled to ${newDate} at ${newTime}`);
                  setIsRescheduleModalOpen(false);
                  setNewDate("");
                  setNewTime("");
                  alert(`Session rescheduled to ${newDate} at ${newTime}`);
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
           
    </div>
  );
};

export default PatientDashboard;


import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Linkedin, Github, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Profile from '@/pages/profile.jpg';
import Aman from '@/pages/Aman.jpg';
import Darshil from '@/pages/Darshil.jpg'

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  github: string;
  email: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Jayanth Midde",
    role: "Full-Stack Developer & API Integrator",
    image: Profile,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "jayanth@example.com",
    bio: "Passionate about creating innovative solutions that bridge the gap between technology and healthcare. Specializes in full-stack development and API integration."
  },
  {
    name: "Anshuman Pati",
    role: "Team Lead",
    image: Profile,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "anshuman@example.com",
    bio: "Experienced team lead with a strong background in project management and software development. Focuses on delivering high-quality solutions."
  },
  {
    name: "Darshil Natwani",
    role: "Software Lead",
    image: Darshil,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "darshil@example.com",
    bio: "Software architect with expertise in system design and implementation. Leads the technical direction of our projects."
  },
  {
    name: "Aman Kumar Singh Rajput",
    role: "Software Lead",
    image: Aman,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "aman@example.com",
    bio: "Software architect with expertise in system design and implementation. Leads the technical direction of our projects."
  },
  {
    name: "Navya",
    role: "Software Lead",
    image: Profile,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "navya@example.com",
    bio: "Software architect with expertise in system design and implementation. Leads the technical direction of our projects."
  },
  {
    name: "Varsha",
    role: "Software Lead",
    image: Profile,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "varsha@example.com",
    bio: "Software architect with expertise in system design and implementation. Leads the technical direction of our projects."
  },
  {
    name: "Dhruva KR",
    role: "Software Lead",
    image: Profile,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "dhruva@example.com",
    bio: "Software architect with expertise in system design and implementation. Leads the technical direction of our projects."
  },
  {
    name: "Musaddik",
    role: "Software Lead",
    image: Profile,
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "musaddik@example.com",
    bio: "Software architect with expertise in system design and implementation. Leads the technical direction of our projects."
  }
];

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-tritonexus-purple to-tritonexus-pink bg-clip-text text-transparent">
              About TritoNexus
            </h1>
            
            {/* Our Story Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-tritonexus-purple/20 text-tritonexus-purple w-8 h-8 rounded-full inline-flex items-center justify-center mr-2">
                  <span className="text-sm">S</span>
                </span>
                Our Story
              </h2>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      TritoNexus was born from a vision to revolutionize how teams collaborate and manage projects. Our journey began when a group of passionate developers and project managers came together, united by a common goal: to create a platform that would make project management intuitive, efficient, and enjoyable.
                    </p>
                    <p className="text-muted-foreground">
                      What started as a simple idea has grown into a comprehensive solution that helps teams worldwide streamline their workflows, track progress, and achieve their goals. Our platform combines cutting-edge technology with user-friendly design to deliver an experience that's both powerful and accessible.
                    </p>
                    <p className="text-muted-foreground">
                      Today, TritoNexus continues to evolve, driven by our commitment to innovation and our users' success. We're proud to be part of countless success stories, helping teams transform their project management experience and achieve new heights of productivity.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Members Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-tritonexus-purple/20 text-tritonexus-purple w-8 h-8 rounded-full inline-flex items-center justify-center mr-2">
                  <span className="text-sm">T</span>
                </span>
                Our Team
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="feature-card hover:scale-[1.01] transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                      <div className="flex space-x-3">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-tritonexus-purple transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-tritonexus-purple transition-colors">
                          <Github className="h-5 w-5" />
                        </a>
                        <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-tritonexus-purple transition-colors">
                          <Mail className="h-5 w-5" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <br />
          

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="bg-gradient-to-br from-tritonexus-purple/5 to-tritonexus-pink/5">
                <CardHeader>
                  <CardTitle className="text-tritonexus-purple">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To revolutionize project management by providing innovative, intuitive, and efficient solutions that empower teams to achieve their goals with confidence and ease.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-tritonexus-purple/5 to-tritonexus-pink/5">
                <CardHeader>
                  <CardTitle className="text-tritonexus-pink">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To become the leading platform for team collaboration and project management, setting new standards for efficiency, innovation, and user experience in the industry.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;

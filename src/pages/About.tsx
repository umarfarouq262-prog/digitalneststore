import Layout from "@/components/Layout";
import { BookOpen, Users, Award } from "lucide-react";

const values = [
  { icon: BookOpen, title: "Quality Content", desc: "Every product is meticulously researched and beautifully designed." },
  { icon: Users, title: "Community Driven", desc: "Built from real feedback and the needs of our growing audience." },
  { icon: Award, title: "Expert Authors", desc: "Created by industry professionals with years of proven experience." },
];

const About = () => (
  <Layout>
    <section className="py-16">
      <div className="container max-w-3xl">
        <h1 className="font-display text-4xl font-bold text-foreground text-center">About DigiShelf</h1>
        <p className="text-muted-foreground mt-6 font-body text-lg leading-relaxed text-center">
          We believe that the right knowledge, delivered beautifully, can change everything. DigiShelf was founded to make premium digital learning accessible, practical, and inspiring.
        </p>

        <div className="grid sm:grid-cols-3 gap-8 mt-16">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center space-y-3 animate-fade-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-4">Our Mission</h2>
          <p className="text-muted-foreground font-body leading-relaxed text-center">
            To empower individuals and teams with actionable insights packed into beautifully crafted digital products. We're not about fluff — every page is designed to deliver real, measurable value.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;

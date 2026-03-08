import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const posts = [
  { slug: "1", title: "5 Habits of Highly Productive People", excerpt: "Discover the daily routines that top performers swear by and how to implement them today.", date: "Mar 5, 2026", category: "Productivity" },
  { slug: "2", title: "The Beginner's Guide to Digital Marketing", excerpt: "Everything you need to know to start marketing your business online, from SEO to social media.", date: "Feb 28, 2026", category: "Marketing" },
  { slug: "3", title: "Why eBooks Are the Future of Learning", excerpt: "How digital content is reshaping education and professional development for the better.", date: "Feb 20, 2026", category: "Insights" },
  { slug: "4", title: "How to Build a Personal Brand in 2026", excerpt: "Stand out in a crowded market with these proven personal branding strategies.", date: "Feb 12, 2026", category: "Branding" },
];

const Blog = () => (
  <Layout>
    <section className="py-16">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-foreground">Blog & Resources</h1>
          <p className="text-muted-foreground mt-3 font-body">Free tips, insights, and updates from the DigiShelf team.</p>
        </div>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-border pb-8 last:border-0 animate-fade-in">
              <span className="text-xs font-body font-semibold uppercase tracking-wider text-accent">{post.category}</span>
              <h2 className="font-display text-xl font-semibold text-foreground mt-1">{post.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <span className="text-sm font-body font-medium text-accent cursor-pointer hover:underline">Read more →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Blog;

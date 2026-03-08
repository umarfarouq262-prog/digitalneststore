const TestimonialCard = ({ quote, name, role }: { quote: string; name: string; role: string }) => (
  <div className="bg-card border border-border rounded-lg p-6 space-y-4">
    <p className="text-sm text-muted-foreground italic leading-relaxed">"{quote}"</p>
    <div>
      <p className="font-body text-sm font-semibold text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  </div>
);

export default TestimonialCard;

import { Shield, Home, Clock } from 'lucide-react';

const props = [
  {
    icon: Shield,
    title: 'NABH Accredited',
    description: 'Certified diagnostic center meeting national quality standards',
  },
  {
    icon: Home,
    title: 'Home Sample Collection',
    description: 'We come to you. Book a home visit for lab tests',
  },
  {
    icon: Clock,
    title: 'Reports in 24hrs',
    description: 'Receive your digital reports within 24 hours of your test',
  },
];

export default function ValueProps() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {props.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-blue-50 rounded-xl shadow-sm p-6 flex flex-col items-center text-center gap-3"
          >
            <Icon className="w-10 h-10 text-blue-600" />
            <h3 className="text-slate-900 font-semibold text-lg">{title}</h3>
            <p className="text-slate-600 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

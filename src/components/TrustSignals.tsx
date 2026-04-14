import { Users, FlaskConical, Award, BadgeCheck } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Patients Served' },
  { icon: FlaskConical, value: '50+', label: 'Diagnostic Tests' },
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: BadgeCheck, value: 'ISO', label: 'Certified' },
];

export default function TrustSignals() {
  return (
    <section className="bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center text-center gap-2">
            <Icon className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-slate-900">{value}</span>
            <span className="text-slate-500 text-sm">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

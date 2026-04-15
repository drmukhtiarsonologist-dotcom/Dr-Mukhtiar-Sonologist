import { Users, ScanLine, Award, MapPin } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Patients Served', urdu: 'مریض' },
  { icon: ScanLine, value: '20+', label: 'Scan Types', urdu: 'اسکین اقسام' },
  { icon: Award, value: '15+', label: 'Years Experience', urdu: 'سال تجربہ' },
  { icon: MapPin, value: 'Larkana', label: 'Ladies Jail Road', urdu: 'لاڑکانہ' },
];

export default function TrustSignals() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-900 py-16 px-4" aria-label="Trust signals">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ icon: Icon, value, label, urdu }) => (
          <div key={label} className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-1">
              <Icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-extrabold text-white">{value}</span>
            <span className="text-blue-100 text-sm font-medium">{label}</span>
            <span className="text-blue-300 text-xs">{urdu}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Award, Clock3, UserCheck, Microscope } from 'lucide-react';

const props = [
  {
    icon: Award,
    title: 'Expert Sonologist',
    urdu: 'ماہر سونولوجسٹ',
    description: 'Performed by qualified and experienced diagnostic imaging specialists.',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Microscope,
    title: 'Advanced Equipment',
    urdu: 'جدید آلات',
    description: 'State-of-the-art 2D/3D/4D ultrasound machines for precise imaging.',
    color: 'from-cyan-500 to-cyan-700',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    icon: Clock3,
    title: 'Fast Results',
    urdu: 'فوری نتائج',
    description: 'Receive your ultrasound report on the same day of your appointment.',
    color: 'from-indigo-500 to-indigo-700',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: UserCheck,
    title: 'Easy Online Booking',
    urdu: 'آسان آن لائن بکنگ',
    description: 'Book your scan in minutes. No long queues, no waiting.',
    color: 'from-violet-500 to-violet-700',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
];

export default function ValueProps() {
  return (
    <section className="py-20 px-4 bg-white" aria-label="Why choose Dr. Mukhtiar Ultrasounds">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Why Choose Us?
          </h2>
          <p className="text-slate-500 text-base">ہمیں کیوں منتخب کریں؟</p>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map(({ icon: Icon, title, urdu, description, bg, iconColor }) => (
            <div
              key={title}
              className={`${bg} rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow border border-white`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center`}>
                <Icon className={`w-7 h-7 ${iconColor}`} />
              </div>
              <h3 className="text-slate-900 font-bold text-base">{title}</h3>
              <p className="text-slate-500 text-xs font-medium">{urdu}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Layout from '../components/Layout';
import { GraduationCap, Award, Stethoscope, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            About Our Doctor
          </h1>
          <p className="text-slate-500">ڈاکٹر کے بارے میں</p>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
        </div>

        {/* Doctor profile card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-10 flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-14 h-14 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Dr. Mukhtiar Ahmed Abro
              </h2>
              <p className="text-blue-200 font-semibold text-lg mt-1">MBBS, DMRD, MAIUM (USA)</p>
              <p className="text-blue-300 text-sm mt-1">ڈاکٹر مختیار احمد ابڑو</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">Consultant Radiologist</span>
                <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">کنسلٹنٹ ریڈیولوجسٹ</span>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Qualifications */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Qualifications / تعلیمی قابلیت</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• MBBS</li>
                  <li>• DMRD (Diploma in Medical Radio-Diagnosis)</li>
                  <li>• MAIUM (USA) — Member, American Institute of Ultrasound in Medicine</li>
                </ul>
              </div>
            </div>

            {/* Academic Position */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Academic Position / تعلیمی عہدہ</h3>
                <p className="text-slate-600 text-sm">Associate Professor of Radiology Department (Retired)</p>
                <p className="text-slate-600 text-sm">Shaheed Mohtarma Benazir Bhutto Medical University, Larkana</p>
                <p className="text-slate-500 text-xs mt-1">شہید محترمہ بینظیر بھٹو میڈیکل یونیورسٹی لاڑکانہ</p>
              </div>
            </div>

            {/* Clinic */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Clinic / کلینک</h3>
                <p className="text-slate-600 text-sm font-semibold">Karachi Medical & Diagnostic Centre</p>
                <p className="text-slate-600 text-sm">Near Ghinti Phatak, Larkana, Sindh, Pakistan</p>
                <p className="text-slate-500 text-xs mt-1">کراچی میڈیکل اینڈ ڈائیگنوسٹک سینٹر، نزد گھنٹی پھاٹک، لاڑکانہ</p>
              </div>
            </div>

            {/* Specializations */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Specializations / تخصص</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• 2D / 3D / 4D Ultrasound</li>
                  <li>• Doppler Imaging</li>
                  <li>• Echocardiography</li>
                  <li>• Obstetric & Gynecological Ultrasound</li>
                  <li>• Musculoskeletal Ultrasound</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Experience stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '15+', label: 'Years Experience', urdu: 'سال تجربہ' },
            { value: '10,000+', label: 'Patients Served', urdu: 'مریض' },
            { value: 'MAIUM', label: 'USA Certified', urdu: 'امریکی سرٹیفکیٹ' },
            { value: 'Prof.', label: 'Academic Rank', urdu: 'تعلیمی درجہ' },
          ].map((stat) => (
            <div key={stat.label} className="bg-blue-50 rounded-2xl p-5 text-center">
              <div className="text-2xl font-extrabold text-blue-700">{stat.value}</div>
              <div className="text-slate-700 text-sm font-medium mt-1">{stat.label}</div>
              <div className="text-slate-400 text-xs">{stat.urdu}</div>
            </div>
          ))}
        </div>

        {/* Services offered */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Services Offered / خدمات</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Abdominal & Pelvic Ultrasound',
              'Obstetric Scans (2D/3D/4D)',
              'Echocardiogram (Heart USG)',
              'Carotid & Renal Doppler',
              'Thyroid & Neck Ultrasound',
              'Breast Ultrasound',
              'Musculoskeletal Ultrasound',
              'Health Packages',
            ].map((service) => (
              <div key={service} className="flex items-center gap-2 text-slate-700 text-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

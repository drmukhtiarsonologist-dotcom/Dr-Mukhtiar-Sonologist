import { useState } from 'react';
import Layout from '../components/Layout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need a doctor\'s referral to book an ultrasound?',
    urduQ: 'کیا الٹراساؤنڈ کے لیے ڈاکٹر کی پرچی ضروری ہے؟',
    a: 'No referral is required. You can book directly online or by calling us. However, bringing any previous reports or prescriptions helps the sonologist provide a more accurate assessment.',
    urduA: 'نہیں، آپ براہ راست آن لائن یا فون پر بک کر سکتے ہیں۔ تاہم پرانی رپورٹس لانا مددگار ہوتا ہے۔',
  },
  {
    q: 'How long does an ultrasound scan take?',
    urduQ: 'الٹراساؤنڈ اسکین میں کتنا وقت لگتا ہے؟',
    a: 'Most scans take between 20–45 minutes depending on the type. Obstetric scans may take longer. You will receive your report on the same day.',
    urduA: 'زیادہ تر اسکین 20 سے 45 منٹ میں مکمل ہوتے ہیں۔ رپورٹ اسی دن مل جاتی ہے۔',
  },
  {
    q: 'Do I need to fast before my ultrasound?',
    urduQ: 'کیا الٹراساؤنڈ سے پہلے روزہ رکھنا ضروری ہے؟',
    a: 'It depends on the type of scan. Abdominal and liver scans require 6 hours of fasting. Obstetric and pelvic scans require a full bladder. Thyroid and neck scans require no preparation. Specific instructions are provided at the time of booking.',
    urduA: 'یہ اسکین کی قسم پر منحصر ہے۔ پیٹ کے اسکین کے لیے 6 گھنٹے کا روزہ ضروری ہے۔ بکنگ کے وقت مکمل ہدایات دی جاتی ہیں۔',
  },
  {
    q: 'When will I receive my report?',
    urduQ: 'رپورٹ کب ملے گی؟',
    a: 'Reports are provided on the same day of your appointment. For complex cases, the report may be ready within a few hours.',
    urduA: 'رپورٹ اپوائنٹمنٹ کے دن ہی مل جاتی ہے۔ پیچیدہ کیسز میں چند گھنٹے لگ سکتے ہیں۔',
  },
  {
    q: 'Is the ultrasound safe during pregnancy?',
    urduQ: 'کیا حمل کے دوران الٹراساؤنڈ محفوظ ہے؟',
    a: 'Yes, ultrasound is completely safe during pregnancy. It uses sound waves, not radiation. It is routinely recommended by doctors to monitor fetal growth and development.',
    urduA: 'جی ہاں، الٹراساؤنڈ حمل کے دوران بالکل محفوظ ہے۔ یہ آواز کی لہروں سے کام کرتا ہے، تابکاری سے نہیں۔',
  },
  {
    q: 'Can I bring a family member with me?',
    urduQ: 'کیا میں اپنے ساتھ کسی کو لا سکتا/سکتی ہوں؟',
    a: 'Yes, you are welcome to bring a family member or companion. For obstetric scans, partners are encouraged to attend.',
    urduA: 'جی ہاں، آپ اپنے ساتھ کسی کو لا سکتے ہیں۔ حمل کے اسکین میں شریک حیات کو ساتھ لانے کی ترغیب دی جاتی ہے۔',
  },
  {
    q: 'How do I book an appointment?',
    urduQ: 'اپوائنٹمنٹ کیسے بک کریں؟',
    a: 'You can book online through our website, call us at 074-4042020, or message us on WhatsApp at +92-316-3618120.',
    urduA: 'آپ ویب سائٹ پر آن لائن، 074-4042020 پر فون کر کے، یا واٹس ایپ پر +92-316-3618120 پر پیغام بھیج کر بک کر سکتے ہیں۔',
  },
  {
    q: 'What payment methods are accepted?',
    urduQ: 'ادائیگی کے کون سے طریقے قبول کیے جاتے ہیں؟',
    a: 'We accept cash payments at the clinic. Please contact us for any special payment arrangements.',
    urduA: 'ہم کلینک میں نقد ادائیگی قبول کرتے ہیں۔ خصوصی انتظامات کے لیے ہم سے رابطہ کریں۔',
  },
  {
    q: 'What is the difference between 2D and 3D ultrasound?',
    urduQ: '2D اور 3D الٹراساؤنڈ میں کیا فرق ہے؟',
    a: '2D ultrasound shows flat, cross-sectional images and is used for most diagnostic purposes. 3D ultrasound creates three-dimensional images, commonly used in obstetrics to visualize the baby\'s features more clearly.',
    urduA: '2D الٹراساؤنڈ چپٹی تصاویر دکھاتا ہے اور زیادہ تر تشخیص کے لیے استعمال ہوتا ہے۔ 3D الٹراساؤنڈ تین جہتی تصاویر بناتا ہے۔',
  },
  {
    q: 'Is parking available at the clinic?',
    urduQ: 'کیا کلینک میں پارکنگ دستیاب ہے؟',
    a: 'Yes, parking is available near Karachi Medical & Diagnostic Centre at Ghinti Phatak, Larkana.',
    urduA: 'جی ہاں، گھنٹی پھاٹک کے قریب کراچی میڈیکل اینڈ ڈائیگنوسٹک سینٹر کے پاس پارکنگ دستیاب ہے۔',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <div>
          <p className="font-semibold text-slate-900 text-sm">{index + 1}. {faq.q}</p>
          <p className="text-slate-400 text-xs mt-0.5">{faq.urduQ}</p>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-6 py-4 bg-blue-50 border-t border-slate-100">
          <p className="text-slate-700 text-sm leading-relaxed">{faq.a}</p>
          <p className="text-slate-500 text-xs mt-2 italic">{faq.urduA}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500">اکثر پوچھے جانے والے سوالات</p>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-2xl p-6 text-center">
          <p className="text-slate-700 font-semibold mb-1">Still have questions? / ابھی بھی سوال ہے؟</p>
          <p className="text-slate-500 text-sm mb-4">Call us or send a WhatsApp message</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:07440420020" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
              📞 074-4042020
            </a>
            <a href="https://wa.me/923163618120" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

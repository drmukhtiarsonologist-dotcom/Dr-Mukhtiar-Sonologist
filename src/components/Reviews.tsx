const reviews = [
  {
    name: 'Fatima Bibi',
    urduName: 'فاطمہ بی بی',
    location: 'Larkana',
    rating: 5,
    text: 'Excellent service! The ultrasound was done professionally and the report was ready the same day. Highly recommended.',
    urduText: 'بہترین خدمت! الٹراساؤنڈ بہت پیشہ ورانہ طریقے سے کیا گیا اور رپورٹ اسی دن مل گئی۔',
    avatar: 'F',
    color: 'bg-pink-500',
  },
  {
    name: 'Muhammad Saleem',
    urduName: 'محمد سلیم',
    location: 'Larkana',
    rating: 5,
    text: 'Dr. Mukhtiar is very experienced. The 3D scan of my wife was crystal clear. Very satisfied with the results.',
    urduText: 'ڈاکٹر مختیار بہت تجربہ کار ہیں۔ میری اہلیہ کا 3D اسکین بالکل واضح تھا۔',
    avatar: 'M',
    color: 'bg-blue-500',
  },
  {
    name: 'Zainab Noor',
    urduName: 'زینب نور',
    location: 'Sukkur',
    rating: 5,
    text: 'Came from Sukkur specifically for this clinic. The equipment is modern and the staff is very helpful and professional.',
    urduText: 'سکھر سے خاص طور پر اس کلینک کے لیے آئی۔ آلات جدید ہیں اور عملہ بہت مددگار ہے۔',
    avatar: 'Z',
    color: 'bg-teal-500',
  },
  {
    name: 'Ahmed Khan',
    urduName: 'احمد خان',
    location: 'Larkana',
    rating: 5,
    text: 'Online booking was very easy. No waiting time. The abdominal scan was done quickly and accurately.',
    urduText: 'آن لائن بکنگ بہت آسان تھی۔ انتظار نہیں کرنا پڑا۔ پیٹ کا اسکین جلدی اور درست طریقے سے ہوا۔',
    avatar: 'A',
    color: 'bg-indigo-500',
  },
  {
    name: 'Rukhsana Begum',
    urduName: 'رخسانہ بیگم',
    location: 'Larkana',
    rating: 5,
    text: 'Best ultrasound centre in Larkana. Very clean environment, professional staff, and accurate reports.',
    urduText: 'لاڑکانہ کا بہترین الٹراساؤنڈ سینٹر۔ صاف ماحول، پیشہ ور عملہ اور درست رپورٹس۔',
    avatar: 'R',
    color: 'bg-purple-500',
  },
  {
    name: 'Imran Ali',
    urduName: 'عمران علی',
    location: 'Larkana',
    rating: 5,
    text: 'Got my cardiac echo done here. Very thorough examination. The doctor explained everything clearly.',
    urduText: 'یہاں دل کا ایکو کروایا۔ بہت مکمل معائنہ۔ ڈاکٹر نے سب کچھ واضح طور پر سمجھایا۔',
    avatar: 'I',
    color: 'bg-orange-500',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-20 px-4 bg-slate-50" aria-label="Patient reviews and testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            What Our Patients Say
          </h2>
          <p className="text-slate-500 text-base">ہمارے مریضوں کی رائے</p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <StarRating count={5} />
            <span className="text-slate-700 font-semibold text-sm">5.0 / 5.0</span>
            <span className="text-slate-400 text-sm">· 200+ Reviews</span>
          </div>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col gap-3"
            >
              <StarRating count={review.rating} />
              <p className="text-slate-700 text-sm leading-relaxed">"{review.text}"</p>
              <p className="text-slate-400 text-xs italic">"{review.urduText}"</p>
              <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-50">
                <div className={`w-9 h-9 rounded-full ${review.color} text-white font-bold text-sm flex items-center justify-center flex-shrink-0`}>
                  {review.avatar}
                </div>
                <div>
                  <p className="text-slate-900 font-semibold text-sm">{review.name}</p>
                  <p className="text-slate-400 text-xs">{review.urduName} · {review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

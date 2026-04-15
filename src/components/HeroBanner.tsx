import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
          Precision Imaging. Prioritizing Your Time.
        </h1>
        <p className="text-blue-200 text-lg mb-1">درست تصویر کشی۔ آپ کا وقت ہماری ترجیح۔</p>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mt-4 mb-2">
          Skip the waiting room. Book your ultrasounds and lab tests online and receive secure
          digital reports instantly.
        </p>
        <p className="text-blue-200 text-base max-w-2xl mx-auto mb-8">
          انتظار چھوڑیں۔ آن لائن الٹراساؤنڈ اور لیب ٹیسٹ بک کریں اور فوری ڈیجیٹل رپورٹ حاصل کریں۔
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/cart"
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Secure My Slot / اپنی باری محفوظ کریں
          </Link>
          <Link
            to="/services"
            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            View All Services / تمام خدمات دیکھیں
          </Link>
        </div>
      </div>
    </section>
  );
}

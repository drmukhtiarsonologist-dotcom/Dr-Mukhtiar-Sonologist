import Layout from '../components/Layout';
import HeroBanner from '../components/HeroBanner';
import ValueProps from '../components/ValueProps';
import FeaturedServices from '../components/FeaturedServices';
import TrustSignals from '../components/TrustSignals';
import Reviews from '../components/Reviews';
import GoogleMap from '../components/GoogleMap';

export default function HomePage() {
  return (
    <Layout>
      <HeroBanner />
      <ValueProps />
      <FeaturedServices />
      <TrustSignals />
      <Reviews />
      <GoogleMap />
    </Layout>
  );
}

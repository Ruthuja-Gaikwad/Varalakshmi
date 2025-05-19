import { BookOpenIcon, FlagIcon, UserIcon } from '@heroicons/react/outline';
import 'font-awesome/css/font-awesome.min.css';

const AboutUs = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Banner Section */}
      <header className="relative w-full h-[500px] overflow-hidden">
        <img 
          src="/images/banner-image.jpg" 
          alt="Artisans at work" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-5xl font-extrabold text-yellow-400 uppercase animate-fade-in">
            About Us
          </h1>
        </div>
      </header>

      {/* History Section */}
      <section className="py-16 bg-gradient-to-r from-gray-100 via-white to-gray-100 animate-slide-up">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-yellow-600 mb-4 flex items-center">
            <BookOpenIcon className="h-6 w-6 text-yellow-600 mr-4" /> Our History
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            Founded with a deep respect for tradition and a passion for craftsmanship, Varalakshmi Workshop began as a small initiative to empower local artisans.
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Over the years, it has evolved into a thriving platform where traditional techniques meet modern design sensibilities. Our history is rooted in community, creativity, and continuous learning.
          </p>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 bg-yellow-50 animate-slide-up">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-yellow-700 mb-4 flex items-center">
            <FlagIcon className="h-6 w-6 text-yellow-700 mr-4" /> Our Mission & Values
          </h2>
          <p className="text-lg leading-relaxed text-gray-800 mb-4">
            Our mission is to bridge the gap between tradition and innovation, providing artisans the visibility they deserve while encouraging sustainable production practices.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Empowering artisans through fair trade opportunities</li>
            <li>Preserving cultural heritage with pride</li>
            <li>Promoting ethical and sustainable craftsmanship</li>
          </ul>
        </div>
      </section>

      {/* Owner Profile Section */}
      <section className="py-16 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-slide-up">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-yellow-700 mb-6 flex items-center">
            <UserIcon className="h-6 w-6 text-yellow-700 mr-4" /> About the Owner
          </h2>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
            {/* Owner Image */}
            <div className="w-[450px] h-[350px] flex-shrink-0">
              {/* Owner Image */}
            <div className="w-[450px] h-[350px] flex-shrink-0 bg-yellow-100 p-4 rounded-xl shadow-inner">
              <img 
                src="/images/owner-photo.jpg" 
                alt="Owner" 
                className="w-full h-full object-contain rounded-md shadow-md transition duration-500 ease-in-out hover:scale-105"
              />
            </div>

            </div>

            {/* Owner Bio */}
            {/* Owner Bio */}
            <div className="md:flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Bapurao Gaikwad</h3>
              <p className="text-lg text-gray-700 mb-3">
                Bapurao Gaikwad is the owner and founder of Varalakshmi Workshop. His vision and leadership have been instrumental in building a platform that empowers artisans and revives traditional craftsmanship.
              </p>
              <p className="text-lg text-gray-700">
                Through years of dedication and hands-on involvement, Bapurao has nurtured a community-driven space that celebrates cultural heritage while embracing innovation. His passion continues to shape the future of artisan work.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

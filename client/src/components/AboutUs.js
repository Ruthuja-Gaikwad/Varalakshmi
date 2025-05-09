import { BookOpenIcon, FlagIcon, UserIcon } from '@heroicons/react/outline';
import 'font-awesome/css/font-awesome.min.css';
const AboutUs = () => {
  return (
    <div className="font-roboto text-gray-800">
      {/* Banner Section */}
      <header className="relative w-full h-96 overflow-hidden">
        <img 
          src="path-to-banner-image.jpg" 
          alt="Artisans at work" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-4xl font-bold text-yellow-500 uppercase">About Us</h1>
        </div>
      </header>

      {/* History Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-yellow-500 mb-6 flex items-center">
            <BookOpenIcon className="h-6 w-6 text-yellow-500 mr-4" /> Our History
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Varalakshmi Workshop was founded with the vision of preserving traditional craftsmanship while empowering artisans...
          </p>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-yellow-500 mb-6 flex items-center">
            <FlagIcon className="h-6 w-6 text-yellow-500 mr-4" /> Our Mission & Values
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Our mission is to support artisans, providing them with a platform to showcase their talent...
          </p>
        </div>
      </section>

      {/* Owner Profile Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-yellow-500 mb-6 flex items-center">
            <UserIcon className="h-6 w-6 text-yellow-500 mr-4" /> About the Owner
          </h2>
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2">
              <img 
                src="path-to-owner-photo.jpg" 
                alt="Owner" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Varalakshmi Rao</h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                Varalakshmi Rao, the founder of Varalakshmi Workshop, is a passionate advocate of preserving traditional crafts...
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

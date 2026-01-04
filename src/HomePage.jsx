import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/swiper-custom.css"; // custom overrides if needed

import { BEST_WORKERS, TESTIMONIALS } from "./constants";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Swiper Slider */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-full w-full"
        >
          <SwiperSlide>
            <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-r from-indigo-700 to-purple-600 text-white p-8 animate-fade-in">
              <img
                src="https://picsum.photos/1920/1080?random=12"
                alt="Hero Banner 1"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-slide-up">
                  Earn Money, Anytime, Anywhere
                </h2>
                <p className="text-lg md:text-2xl font-light animate-slide-up-delay">
                  Complete simple tasks and get paid instantly.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-500 text-white p-8 animate-fade-in">
              <img
                src="https://picsum.photos/1920/1080?random=13"
                alt="Hero Banner 2"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-slide-up">
                  Hire Talent for Microtasks
                </h2>
                <p className="text-lg md:text-2xl font-light animate-slide-up-delay">
                  Get your small jobs done quickly and efficiently.
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-r from-red-600 to-yellow-500 text-white p-8 animate-fade-in">
              <img
                src="https://picsum.photos/1920/1080?random=14"
                alt="Hero Banner 3"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 animate-slide-up">
                  Manage Your Workforce Effortlessly
                </h2>
                <p className="text-lg md:text-2xl font-light animate-slide-up-delay">
                  Admin tools for smooth platform operations.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Best Workers Section */}
      <section className="container mx-auto py-16 px-4">
        <h3 className="text-4xl font-extrabold text-center text-gray-900 mb-12 animate-fade-in-up">
          Our Top Workers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {BEST_WORKERS.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-in-out border border-indigo-100"
            >
              <img
                src={worker.photoUrl}
                alt={worker.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-indigo-500"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-1">
                {worker.name}
              </h4>
              <p className="text-lg font-bold text-yellow-500">
                {worker.coins} Coins
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 py-16 px-4">
        <h3 className="text-4xl font-extrabold text-center text-white mb-12 animate-fade-in-up">
          What Our Users Say
        </h3>
        <div className="container mx-auto">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-lg shadow-xl p-8 mx-4 flex flex-col items-center justify-center h-full text-center border-b-4 border-yellow-400">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-indigo-500"
                  />
                  <p className="text-gray-700 text-lg italic mb-4">
                    "{testimonial.quote}"
                  </p>
                  <h4 className="text-xl font-semibold text-indigo-700">
                    {testimonial.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h3 className="text-4xl font-extrabold text-gray-900 mb-12 animate-fade-in-up">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100 transform hover:scale-105 transition-transform duration-300">
            <div className="text-indigo-600 text-5xl mb-4">💡</div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">
              Create or Find Tasks
            </h4>
            <p className="text-gray-600 text-lg">
              Buyers post tasks, workers browse and select jobs that fit their
              skills.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100 transform hover:scale-105 transition-transform duration-300">
            <div className="text-green-600 text-5xl mb-4">🚀</div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">
              Submit & Review
            </h4>
            <p className="text-gray-600 text-lg">
              Workers submit proof, buyers review and approve the work.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100 transform hover:scale-105 transition-transform duration-300">
            <div className="text-yellow-600 text-5xl mb-4">💰</div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">
              Earn & Pay
            </h4>
            <p className="text-gray-600 text-lg">
              Workers earn coins, buyers pay for completed tasks. Simple, fair,
              and fast.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-indigo-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-extrabold text-gray-900 mb-12 animate-fade-in-up">
            Why Choose MicroTasker Hub?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 transform hover:-translate-y-1 transition-transform duration-300">
              <svg
                className="h-12 w-12 text-blue-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7.835 4.697A3.42 3.42 0 007 9.111v3.089l-5.435 5.435A6.003 6.003 0 0012 22a5.996 5.996 0 007.954-2.213l-5.422-5.422V9.111c0-2.427-.864-4.65-2.345-6.314C11.373 3.018 10.155 2.5 9 2.5a6.003 6.003 0 00-1.165 2.197z"
                />
              </svg>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Flexible Work
              </h4>
              <p className="text-gray-600">
                Work on your terms, whenever and wherever you choose.
              </p>
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500 transform hover:-translate-y-1 transition-transform duration-300">
              <svg
                className="h-12 w-12 text-purple-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14c-4.418 0-8 2-8 5v1h16v-1c0-3-3.582-5-8-5z"
                />
              </svg>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Diverse Tasks
              </h4>
              <p className="text-gray-600">
                A wide variety of tasks suitable for different skills.
              </p>
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500 transform hover:-translate-y-1 transition-transform duration-300">
              <svg
                className="h-12 w-12 text-green-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H6.737a2 2 0 01-1.789-2.894l3.5-7A2 2 0 019.236 9H14zm-7 0H2a2 2 0 00-2 2v2a2 2 0 002 2h2V9a2 2 0 012-2h1a2 2 0 012 2v7.5l-2.091 2.091a1 1 0 00.707 1.707h1.586a1 1 0 00.707-1.707L11.586 16H16a2 2 0 002-2V9a2 2 0 012-2h1a2 2 0 012 2h-5z"
                />
              </svg>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Secure Payments
              </h4>
              <p className="text-gray-600">
                Reliable and transparent payment processing.
              </p>
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md border-t-4 border-yellow-500 transform hover:-translate-y-1 transition-transform duration-300">
              <svg
                className="h-12 w-12 text-yellow-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h-10c-1.104 0-2-.896-2-2v-11c0-1.104.896-2 2-2h10c1.104 0 2 .896 2 2v11c0 1.104-.896 2-2 2zm-5-17c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm-5 7h10v2H7v-2zm0 4h10v2H7v-2z"
                />
              </svg>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Dedicated Support
              </h4>
              <p className="text-gray-600">
                Our team is here to help you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-teal-500 to-cyan-600 py-20 px-4 text-white text-center">
        <div className="container mx-auto">
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6 animate-fade-in-up">
            Ready to Start Earning or Hiring?
          </h3>
          <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
            Join thousands of satisfied users. Whether you're looking for
            flexible work or efficient task completion, MicroTasker Hub is your
            go-to platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/#/register"
              className="px-8 py-4 bg-white text-teal-600 text-xl font-bold rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-transform duration-300 animate-bounce-slow"
            >
              Get Started Now!
            </a>
            <a
              href="/#/login"
              className="px-8 py-4 border-2 border-white text-white text-xl font-bold rounded-full shadow-lg hover:bg-white hover:text-teal-600 transform hover:scale-105 transition-transform duration-300 animate-bounce-slow"
            >
              Already a Member? Login
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
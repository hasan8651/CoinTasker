import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles/swiper-custom.css";

import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

import { BEST_WORKERS, TESTIMONIALS, WEBSITE_NAME } from "./constants";

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Top 6 workers by coins
  const topWorkers = [...BEST_WORKERS]
    .sort((a, b) => b.coins - a.coins)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section – Swiper Slider */}
      <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <Swiper
          spaceBetween={30}
          centeredSlides
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-base-100 p-8 animate-fade-in">
              <img
                src="https://picsum.photos/1920/1080?random=21"
                alt="Earn micro tasks"
                className="absolute inset-0 w-full h-full object-cover opacity-25"
              />
              <div className="relative z-10 text-center max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 animate-slide-up">
                  Earn from Micro‑Tasks, Anytime.
                </h2>
                <p className="text-lg md:text-xl font-light animate-slide-up-delay">
                  Complete simple tasks on {WEBSITE_NAME} and turn your free
                  time into real coins and cash.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-r from-emerald-600 to-cyan-500 text-base-100 p-8 animate-fade-in">
              <img
                src="https://picsum.photos/1920/1080?random=22"
                alt="Hire workers"
                className="absolute inset-0 w-full h-full object-cover opacity-25"
              />
              <div className="relative z-10 text-center max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 animate-slide-up">
                  Hire a Global Micro‑Workforce.
                </h2>
                <p className="text-lg md:text-xl font-light animate-slide-up-delay">
                  Buyers can post tasks, review submissions, and pay workers in
                  just a few clicks.
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 text-base-100 p-8 animate-fade-in">
              <img
                src="https://picsum.photos/1920/1080?random=23"
                alt="Admin tools"
                className="absolute inset-0 w-full h-full object-cover opacity-25"
              />
              <div className="relative z-10 text-center max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 animate-slide-up">
                  Smart Controls for Admins.
                </h2>
                <p className="text-lg md:text-xl font-light animate-slide-up-delay">
                  Manage users, tasks, payments and reports from a powerful
                  admin dashboard.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Best Workers Section */}
      <section className="container mx-auto py-16 px-4">
        <motion.div
          data-aos="fade-up"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold text-base-content mb-3">
            Top Workers
          </h3>
          <p className="text-base text-base-content/70">
            Our highest earning workers ranked by coins earned on the platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {topWorkers.map((worker) => (
            <motion.div
              key={worker.id}
              className="card-surface p-4 flex flex-col items-center text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img
                src={worker.photoUrl}
                alt={worker.name}
                className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-primary/80"
              />
              <h4 className="text-base font-semibold text-base-content mb-1">
                {worker.name}
              </h4>
              <p className="text-sm font-bold text-warning">
                {worker.coins} Coins
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section (Swiper) */}
      <section className="py-16 px-4 bg-base-100">
        <div className="container mx-auto" data-aos="fade-up">
          <h3 className="text-3xl md:text-4xl font-extrabold text-center text-base-content mb-10">
            What Our Users Say
          </h3>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="card-surface p-6 mx-2 h-full flex flex-col items-center text-center border-b-4 border-accent">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-primary"
                  />
                  <p className="text-sm text-base-content/80 italic mb-3">
                    “{t.quote}”
                  </p>
                  <h4 className="text-base font-semibold text-primary">
                    {t.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Extra Section 1: How It Works */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h3
          className="text-3xl md:text-4xl font-extrabold text-base-content mb-10"
          data-aos="fade-up"
        >
          How {WEBSITE_NAME} Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="card-surface p-6"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <div className="text-4xl mb-3">📝</div>
            <h4 className="text-xl font-semibold mb-2">Post or Find Tasks</h4>
            <p className="text-sm text-base-content/70">
              Buyers create micro‑tasks, workers discover tasks that match their
              time and skills.
            </p>
          </motion.div>
          <motion.div
            className="card-surface p-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-4xl mb-3">📤</div>
            <h4 className="text-xl font-semibold mb-2">Submit & Review</h4>
            <p className="text-sm text-base-content/70">
              Workers submit proofs, buyers review submissions and approve
              quality work.
            </p>
          </motion.div>
          <motion.div
            className="card-surface p-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-4xl mb-3">💰</div>
            <h4 className="text-xl font-semibold mb-2">Earn & Withdraw</h4>
            <p className="text-sm text-base-content/70">
              Earn coins for every approved task and convert them to cash
              through secure withdrawal options.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Extra Section 2: Why Choose CoinTasker */}
      <section className="bg-base-100 py-16 px-4">
        <div className="container mx-auto text-center">
          <h3
            className="text-3xl md:text-4xl font-extrabold text-base-content mb-10"
            data-aos="fade-up"
          >
            Why Choose {WEBSITE_NAME}?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Flexible Work",
                desc: "Work whenever you want, from any device, with no long‑term commitments.",
                color: "border-primary",
              },
              {
                title: "Diverse Tasks",
                desc: "From surveys to social engagement, choose what you enjoy doing.",
                color: "border-secondary",
              },
              {
                title: "Secure Payments",
                desc: "Transparent coin system and clear conversion rates for buyers & workers.",
                color: "border-success",
              },
              {
                title: "Admin Oversight",
                desc: "Reports, disputes, and fraud are handled by dedicated admins.",
                color: "border-warning",
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className={`card-surface p-6 border-t-4 ${item.color}`}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-base-content/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 3: Call to Action */}
      <section className="section-gradient py-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to start earning or hiring?
          </h3>
          <p className="text-sm md:text-base mb-8 opacity-90">
            Join thousands of workers and buyers on {WEBSITE_NAME}. Whether you
            want flexible income or reliable task completion, we&apos;ve built
            the tools for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/#/register" className="btn btn-gradient normal-case">
              Get Started as Worker
            </a>
            <a
              href="/#/register"
              className="btn btn-outline border-base-100 text-base-100 normal-case"
            >
              Post Tasks as Buyer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

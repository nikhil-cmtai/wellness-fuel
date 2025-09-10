import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-12">
      <section className="max-w-3xl w-full flex flex-col items-center text-center gap-8">
        <Image
          src="/healthcare-hero.svg"
          alt="Healthcare illustration"
          width={180}
          height={120}
          className="mb-2"
        />
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2">
          Welcome to HealthCare Co.
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Your trusted partner in health and wellness. We provide quality healthcare products and services to help you live a healthier life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/products"
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow"
          >
            View Products
          </a>
          <a
            href="/about"
            className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>

      <section className="max-w-4xl w-full mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
          <Image src="/doctor.svg" alt="Doctor" width={48} height={48} className="mb-3" />
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">Expert Doctors</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Our team of certified professionals is here to provide you with the best care and advice.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
          <Image src="/pharmacy.svg" alt="Pharmacy" width={48} height={48} className="mb-3" />
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">Quality Products</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            We offer a wide range of healthcare products to meet your needs, from medicine to wellness.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow flex flex-col items-center">
          <Image src="/support.svg" alt="Support" width={48} height={48} className="mb-3" />
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">24/7 Support</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Our support team is available around the clock to assist you with any questions or concerns.
          </p>
        </div>
      </section>
    </div>
  );
}

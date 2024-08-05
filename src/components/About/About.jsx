

export default function About() {
   
  return <>
  <div className="about-page bg-gray-50 py-12">
      <div className="container mx-auto px-6">
      <h2 className="text-green-700 text-center my-6 text-5xl font-serif">
        About Us 
      </h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-4">
            <img src="https://via.placeholder.com/500" alt="Our Team" className="rounded-lg shadow-lg object-cover w-full h-64 md:h-auto" />
          </div>
          <div className="md:w-1/2 p-4">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Welcome to our store! We are passionate about providing the best products to our customers.
              Our journey began with a simple idea: to create a place where people can find unique and high-quality items.
              Today, we are proud to offer a wide range of products that cater to different tastes and preferences.
            </p>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Our mission is to make online shopping easy, enjoyable, and accessible for everyone.
              We believe in offering exceptional customer service and continuously strive to improve our product selection and shopping experience.
              Your satisfaction is our top priority, and we are committed to ensuring that you have a seamless and enjoyable shopping experience with us.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center">
            {['John Doe', 'Jane Smith', 'Michael Brown', 'Emily Davis'].map((name, index) => (
              <div key={index} className="w-1/2 md:w-1/4 p-4">
                <div className="team-member bg-white p-6 rounded-lg shadow-md text-center">
                  <img src={`https://via.placeholder.com/150?text=${name.split(' ')[0]}`} alt={name} className="rounded-full mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
                  <p className="text-gray-500">Position</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div> </>
}

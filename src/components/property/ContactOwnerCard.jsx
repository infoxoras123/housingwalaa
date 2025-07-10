import { useState } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const ContactOwnerCard = ({ property }) => {
  const [contactVisible, setContactVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, message } = formData;

    // Clean the owner's phone number: remove non-digit chars
    const rawPhone = property?.ownerInfo?.phone || "";
    const cleanedNumber = rawPhone.replace(/\D/g, '');

    // Build WhatsApp message
    const whatsappMessage =
      `Hi, I'm ${username}. My phone number is ${phone}.`
      + (email ? ` My email is ${email}.` : '')
      + (message ? `\n\nMessage: ${message}` : '');

    const whatsappURL = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Contact Owner</h3>

        {/* FLEX OWNER + CONTACT */}
        <div className="flex items-start justify-between mb-4">
          {/* Left: Owner Info */}
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold text-xl">
              {property.ownerInfo.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="font-medium">{property.ownerInfo.name}</p>
              <p className="text-sm text-gray-600">Property Owner</p>
            </div>
          </div>

          {/* Right: Contact */}
          {contactVisible && (
            <div className="text-right space-y-1">
              <div className="flex items-center justify-end">
                <FaPhone className="text-primary-500 mr-2" />
                <a
                  href={`tel:${property.ownerInfo.phone}`}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {property.ownerInfo.phone}
                </a>
              </div>
              <div className="flex items-center justify-end">
                <FaEnvelope className="text-primary-500 mr-2" />
                <a
                  href={`mailto:${property.ownerInfo.email}`}
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {property.ownerInfo.email}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Contact Form or Button */}
        {contactVisible ? (
          <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Your Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email (optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message (optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1"
                rows="3"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-success bg-gray-950 text-white hover:bg-gray-800"
            >
              Let's connect with WhatsApp
            </button>
          </form>
        ) : (
          <button onClick={() => setContactVisible(true)} className="w-full btn btn-primary">
            Show Contact Details
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactOwnerCard;

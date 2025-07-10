import React, { useState } from "react";
import QR from '../assets/Qr.jpg'; 
const initialState = {
  title: "",
  description: "",
  price: "",
  propertyType: "",
  subpropertyType: "",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  latitude: "",
  longitude: "",
  area: "",
  state: "",
  city: "",
  address: "",
  fullAddress: "",
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
  amenities: "",
  nearbyFacilities: "",
  possession: "",
  postedDate: "",
  isForRent: false,
  locality: "",
  furnished: "",
  floor: "",
  parking: "",
  age: "",
  facing: "",
  paymentId: "",
  acceptTerms: false,
};

export default function AddPropertyForm() {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const parseNearbyFacilities = (text) => {
    return text
      .split(",")
      .map((item) => {
        const parts = item.trim().split(":");
        if (parts.length === 3) {
          return { name: parts[0].trim(), type: parts[1].trim(), distance: parts[2].trim() };
        }
        return null;
      })
      .filter(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.acceptTerms) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    const amenitiesArr = form.amenities.split(",").map((a) => a.trim()).filter(Boolean);
    const nearbyArr = parseNearbyFacilities(form.nearbyFacilities);
    const msgLines = [
      `*New Property Submission*`,
      `Title: ${form.title}`,
      `Description: ${form.description}`,
      `Price: ${form.price}`,
      `Property Type: ${form.propertyType}`,
      `Sub Property Type: ${form.subpropertyType}`,
      `Bedrooms: ${form.bedrooms}`,
      `Bathrooms: ${form.bathrooms}`,
      `Balconies: ${form.balconies}`,
      `Latitude: ${form.latitude}`,
      `Longitude: ${form.longitude}`,
      `Area (sq ft): ${form.area}`,
      `State: ${form.state}`,
      `City: ${form.city}`,
      `Address: ${form.address}`,
      `Full Address: ${form.fullAddress}`,
      `Owner Info:`,
      `  Name: ${form.ownerName}`,
      `  Phone: ${form.ownerPhone}`,
      `  Email: ${form.ownerEmail}`,
      `Amenities: ${amenitiesArr.join(", ")}`,
      `Nearby Facilities:`,
      ...nearbyArr.map((nf) => `  - ${nf.name} (${nf.type}), Distance: ${nf.distance}`),
      `Possession: ${form.possession}`,
      `Posted Date (days ago): ${form.postedDate}`,
      `For Rent: ${form.isForRent ? "Yes" : "No"}`,
      `Locality: ${form.locality}`,
      `Furnished: ${form.furnished}`,
      `Floor: ${form.floor}`,
      `Parking: ${form.parking}`,
      `Age: ${form.age}`,
      `Facing: ${form.facing}`,
      `Payment ID: ${form.paymentId}`,
      `\n*Note:* Images cannot be sent via WhatsApp link, please send them manually.`,
    ];
    const whatsappMessage = encodeURIComponent(msgLines.join("\n"));
    const whatsappURL = `https://wa.me/919510774987/?text=${whatsappMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="bg-gray-100 mt-20 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Property</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (e.g., 33 - 43 Lacs)</label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Type</label>
              <input
                type="text"
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sub Property Type</label>
              <input
                type="text"
                name="subpropertyType"
                value={form.subpropertyType}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Balconies</label>
              <input
                type="number"
                name="balconies"
                value={form.balconies}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Area (sq ft)</label>
              <input
                type="number"
                name="area"
                value={form.area}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Address</label>
            <textarea
              name="fullAddress"
              value={form.fullAddress}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6">Owner Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="ownerPhone"
                value={form.ownerPhone}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="ownerEmail"
                value={form.ownerEmail}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Amenities (comma separated)</label>
            <input
              type="text"
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              placeholder="Gymnasium, Clubhouse, CCTV Surveillance"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nearby Facilities (format: name:type:distance, separate multiple by commas)
            </label>
            <textarea
              name="nearbyFacilities"
              value={form.nearbyFacilities}
              onChange={handleChange}
              placeholder="Divine Life International School:School:0.9 km, Swastik Hospital:hospital:0.7 km"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Possession</label>
              <input
                type="text"
                name="possession"
                value={form.possession}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Posted Date (days ago)</label>
              <input
                type="number"
                name="postedDate"
                value={form.postedDate}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Locality</label>
              <input
                type="text"
                name="locality"
                value={form.locality}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Furnished</label>
              <input
                type="text"
                name="furnished"
                value={form.furnished}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Floor</label>
              <input
                type="text"
                name="floor"
                value={form.floor}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Parking (number)</label>
              <input
                type="number"
                name="parking"
                value={form.parking}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="text"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Facing</label>
              <input
                type="text"
                name="facing"
                value={form.facing}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {/* <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Payment ID</label>
              <input
                type="text"
                name="paymentId"
                value={form.paymentId}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div> */}
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isForRent"
                checked={form.isForRent}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm font-medium text-gray-700">Is For Rent?</label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={form.acceptTerms}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
              />
              <label className="ml-2 block text-sm text-gray-700">
                I agree to the terms and conditions: Listing will be processed within 12 hours after submission. Photos must be sent manually.
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!form.acceptTerms}
            className={`w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              form.acceptTerms
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Send on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
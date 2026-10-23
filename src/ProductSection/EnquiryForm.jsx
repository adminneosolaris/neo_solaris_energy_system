import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const EnquiryForm = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        product: product?.name
            ? `${product.name} ${product.value || ''}`.trim()
            : '',
        name: '',
        email: '',
        contact: '',
        state: '',
        city: '',
        pinCode: '',
        productInterested: product?.name
            ? `${product.name} ${product.value || ''}`.trim()
            : '',
        heardAbout: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Enquiry Data:', formData);
        alert('Enquiry submitted successfully!');
        onClose();
    }

    return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[94vh] overflow-y-auto rounded-md bg-[#F8FBFA] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 grid h-9 w-9 place-items-center rounded-full text-[#123A67] hover:bg-[#EAF5EE] transition cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT IMAGE */}
          <div className="relative min-h-[680px] overflow-hidden bg-[#082B50]">

            <img
              src={product?.enquiryImage || product?.image}
              alt="Product Enquiry"
              className="absolute inset-0 h-full w-full object-contain"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10" />

          </div>

          {/* RIGHT FORM */}
          <div className="px-7 py-8 md:px-10 lg:px-12">

            <h2 className="text-2xl md:text-3xl font-semibold text-[#111827]">
              {product?.name || 'Product'} Enquiry
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* Product */}
              <div>
                <label className="block mb-2 text-sm text-[#374151]">
                  Product
                </label>

                <div className="relative">
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#374151] outline-none focus:border-[#159447] focus:ring-1 focus:ring-[#159447]"
                  >
                    <option value="">Select Product</option>
                    <option value={formData.product}>
                      {formData.product || 'Selected Product'}
                    </option>
                  </select>

                  <ChevronDown
                    size={17}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 text-sm text-[#374151]">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#159447] focus:ring-1 focus:ring-[#159447]"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-[#374151]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email id"
                    required
                    className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#159447] focus:ring-1 focus:ring-[#159447]"
                  />
                </div>

              </div>

              {/* Contact + State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 text-sm text-[#374151]">
                    Contact Number *
                  </label>

                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    required
                    className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#159447] focus:ring-1 focus:ring-[#159447]"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-[#374151]">
                    State
                  </label>

                  <div className="relative">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#64748B] outline-none focus:border-[#159447] focus:ring-1 focus:ring-[#159447]"
                    >
                      <option value="">Select your State</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Andhra Pradesh">
                        Andhra Pradesh
                      </option>
                      <option value="Telangana">Telangana</option>
                      <option value="Puducherry">Puducherry</option>
                      <option value="Others">Others</option>
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                    />
                  </div>
                </div>

              </div>

              {/* City + PIN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 text-sm text-[#374151]">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your City Name"
                    className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#159447] focus:ring-1 focus:ring-[#159447]"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-[#374151]">
                    PIN Code *
                  </label>

                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    placeholder="Enter PIN Code"
                    required
                    maxLength={6}
                    className="w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#159447] focus:ring-1 focus:ring-[#159447]"
                  />
                </div>

              </div>

              {/* Product Interested + Heard About */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 text-sm text-[#374151]">
                    Product of Interested *
                  </label>

                  <div className="relative">
                    <select
                      name="productInterested"
                      value={formData.productInterested}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#374151] outline-none focus:border-[#159447] focus:ring-1 focus:ring-[#159447]"
                    >
                      <option value="">
                        Select Product from List
                      </option>

                      <option value={formData.productInterested}>
                        {formData.productInterested || 'Selected Product'}
                      </option>
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-[#374151]">
                    How did You Hear about us
                  </label>

                  <div className="relative">
                    <select
                      name="heardAbout"
                      value={formData.heardAbout}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#374151] outline-none focus:border-[#159447] focus:ring-1 focus:ring-[#159447]"
                    >
                      <option value="">Choose</option>
                      <option value="Google">Google</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Friend">Friend / Reference</option>
                      <option value="Other">Other</option>
                    </select>

                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                    />
                  </div>
                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#159447] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-[#117b3a] cursor-pointer"
              >
                Submit Enquiry
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EnquiryForm;
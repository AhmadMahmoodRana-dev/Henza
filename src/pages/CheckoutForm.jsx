import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import BASEURL from "../constant/BaseUrl";

// Custom regex for Pakistani phone numbers
const pakistanPhoneRegex = /^(\+92|0)?3[0-9]{2}[-]?[0-9]{7}$/;

// Validation Schema
const CheckoutSchema = Yup.object().shape({
  emailOrPhone: Yup.string()
    .test(
      "email-or-phone",
      "Enter a valid email or Pakistani phone number",
      function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return emailRegex.test(value) || pakistanPhoneRegex.test(value);
      }
    )
    .required("Required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  phone: Yup.string()
    .matches(pakistanPhoneRegex, "Enter a valid Pakistani phone number")
    .required("Phone is required"),
});

export default function CheckoutForm() {
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const initialValues = {
    emailOrPhone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    country: "Pakistan",
    payment: "cod",
    billingAddress: "same",
  };

  const handleSubmit = async (values) => {
    console.log("Form Data:", values);
    try {
      const response = await axios.post(`${BASEURL}henza/Addcustomer`, values);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={CheckoutSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white shadow-2xl rounded-3xl p-8 space-y-10 border border-gray-100">
                {/* Contact */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <Field name="emailOrPhone">
                      {({ field, meta }) => (
                        <input
                          {...field}
                          placeholder="Email or mobile phone number"
                          className={`${inputStyle} ${
                            meta.touched && meta.error
                              ? "border-red-500 focus:ring-red-300 focus:border-red-400"
                              : "border-gray-200 focus:ring-[#70c1f3c2] focus:border-[#70c1f3c2]"
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="emailOrPhone"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <label className="inline-flex items-center gap-3 text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                      <input
                        type="checkbox"
                        name="newsletter"
                        className="w-4 h-4 accent-[#70c1f3c2] rounded border-gray-300"
                      />
                      Email me with news and offers
                    </label>
                  </div>
                </section>

                {/* Delivery */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Delivery Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                      as="select"
                      name="country"
                      className={`${inputStyle} cursor-pointer md:col-span-2`}
                    >
                      <option value="Pakistan">Pakistan</option>
                    </Field>
                    <Field name="firstName">
                      {({ field, meta }) => (
                        <input
                          {...field}
                          placeholder="First name"
                          className={`${inputStyle} ${
                            meta.touched && meta.error
                              ? "border-red-500 focus:ring-red-300 focus:border-red-400"
                              : "border-gray-200 focus:ring-[#70c1f3c2] focus:border-[#70c1f3c2]"
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    {/* Last Name */}
                    <Field name="lastName">
                      {({ field, meta }) => (
                        <input
                          {...field}
                          placeholder="Last name"
                          className={`${inputStyle} ${
                            meta.touched && meta.error
                              ? "border-red-500 focus:ring-red-300 focus:border-red-400"
                              : "border-gray-200 focus:ring-[#70c1f3c2] focus:border-[#70c1f3c2]"
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    {/* Address */}
                    <Field name="address">
                      {({ field, meta }) => (
                        <input
                          {...field}
                          placeholder="Address"
                          className={`${inputStyle} ${
                            meta.touched && meta.error
                              ? "border-red-500 focus:ring-red-300 focus:border-red-400"
                              : "border-gray-200 focus:ring-[#70c1f3c2] focus:border-[#70c1f3c2]"
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    {/* City */}
                    <Field name="city">
                      {({ field, meta }) => (
                        <input
                          {...field}
                          placeholder="City"
                          className={`${inputStyle} ${
                            meta.touched && meta.error
                              ? "border-red-500 focus:ring-red-300 focus:border-red-400"
                              : "border-gray-200 focus:ring-[#70c1f3c2] focus:border-[#70c1f3c2]"
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    {/* Country */}
                    <Field name="country">
                      {({ field, meta }) => (
                        <select
                          {...field}
                          className={`${inputStyle} ${
                            meta.touched && meta.error
                              ? "border-red-500 focus:ring-red-300 focus:border-red-400"
                              : "border-gray-200 focus:ring-[#70c1f3c2] focus:border-[#70c1f3c2]"
                          } cursor-pointer`}
                        >
                          <option value="Pakistan">Pakistan</option>
                        </select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    {/* Postal Code */}
                    <Field name="postalCode">
                      {({ field, meta }) => (
                        <input
                          {...field}
                          placeholder="Postal code"
                          className={`${inputStyle} ${
                            meta.touched && meta.error
                              ? "border-red-500 focus:ring-red-300 focus:border-red-400"
                              : "border-gray-200 focus:ring-[#70c1f3c2] focus:border-[#70c1f3c2]"
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="postalCode"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    {/* Phone */}
                    <Field name="phone">
                      {({ field, meta }) => (
                        <input
                          {...field}
                          type="text"
                          maxLength="11"
                          placeholder="Phone"
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9]/g,
                              ""
                            ); // Only numbers
                          }}
                          className={`${inputStyle} ${
                            meta.touched && meta.error
                              ? "border-red-500 focus:ring-red-300 focus:border-red-400"
                              : "border-gray-200 focus:ring-[#70c1f3c2] focus:border-[#70c1f3c2]"
                          }`}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600">
                    <label className="inline-flex items-center gap-3 hover:text-gray-800 cursor-pointer">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        className="w-4 h-4 accent-[#70c1f3c2] rounded border-gray-300"
                      />
                      Save this information for next time
                    </label>
                    <label className="inline-flex items-center gap-3 hover:text-gray-800 cursor-pointer">
                      <input
                        type="checkbox"
                        name="textUpdates"
                        className="w-4 h-4 accent-[#70c1f3c2] rounded border-gray-300"
                      />
                      Text me with news and offers
                    </label>
                  </div>
                </section>

                {/* Shipping Method */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Shipping Method
                  </h2>
                  <div className="p-5 border-2 border-[#247cb1c2] bg-[#70c1f3c2] rounded-xl text-sm font-medium text-gray-700">
                    Standard Shipping —{" "}
                    <strong className="text-green-600 ml-1">FREE</strong>
                  </div>
                </section>

                {/* Payment Details */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Payment Details
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    🔒 All transactions are secure and encrypted with 256-bit
                    SSL protection
                  </p>

                  <div className="space-y-5">
                    {["cod", "card", "bank"].map((payment) => (
                      <label
                        key={payment}
                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer ${
                          selectedPayment === payment
                            ? "border-[#075686] bg-[#70c1f3c2]"
                            : "border-gray-200 hover:border-[#075686]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={payment}
                          checked={selectedPayment === payment}
                          onChange={(e) => {
                            setSelectedPayment(e.target.value);
                            setFieldValue("payment", e.target.value);
                          }}
                          className="w-5 h-5 accent-[#075686]"
                        />
                        <span className="font-medium capitalize">
                          {payment === "cod"
                            ? "Cash on Delivery (COD)"
                            : payment === "card"
                            ? "Debit - Credit Card"
                            : "Bank Deposit"}
                        </span>
                      </label>
                    ))}

                    {selectedPayment === "bank" && (
                      <div className="ml-10 p-4 bg-gray-50 rounded-lg text-sm space-y-2 text-gray-600">
                        <p>
                          <strong>Bank:</strong> Meezan Bank
                        </p>
                        <p>
                          <strong>A/C Title:</strong> SAFDAR PERVAIZ
                        </p>
                        <p>
                          <strong>A/C#:</strong> 02220102248234
                        </p>
                        <p>
                          <strong>IBAN:</strong> PK95MEZN0002220102248234
                        </p>
                        <p className="mt-3 text-red-600 font-medium">
                          Please Note: After payment, please send a screenshot
                          on WhatsApp (+92 315 7418509)
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-gray-500 ml-6 mb-4">
                    After clicking "Pay now", you will be redirected to complete
                    your purchase securely.
                  </div>
                </section>

                {/* Billing Address */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Billing Address
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <Field
                        type="radio"
                        name="billingAddress"
                        value="same"
                        className="w-5 h-5 accent-[#075686]"
                      />
                      Same as shipping address
                    </label>

                    <label className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <Field
                        type="radio"
                        name="billingAddress"
                        value="different"
                        className="w-5 h-5 accent-[#075686]"
                      />
                      Use a different billing address
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-red-200 transition-all duration-300"
                  >
                    Pay Now ➔
                  </button>
                </section>
              </div>

              {/* Order Summary Section */}
              <OrderSummary cartItems={cartItems} />
            </div>
          </Form>
        )}
      </Formik>
      <Footer />
    </>
  );
}

function OrderSummary({ cartItems }) {
  const subtotal = cartItems.reduce((total, item) => {
    const priceStr =
      typeof item.price === "string" ? item.price.replace("$", "") : item.price;
    const price = parseFloat(priceStr) || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);
  return (
    <div className="bg-white shadow-2xl rounded-3xl p-8 h-fit sticky top-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
      {cartItems.map((item, index) => {
        return (
          <div className="flex items-center gap-4 mb-6">
            <img
              src={item?.image}
              alt="Peshawari Chappal"
              className="w-24 h-24 object-cover rounded-lg border-2 border-gray-100"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{item?.name}</p>
              <p className="my-1 text-sm text-gray-900">( {item.sku} )</p>
              <p className="text-sm text-gray-600 mt-1">
                Quantity: {item?.quantity}
              </p>
              <div className="flex justify-between items-center mt-2">
                {item?.size && (
                  <p className="text-sm text-gray-600">Size: {item?.size}</p>
                )}
                <div
                  style={{ backgroundColor: item?.color }}
                  className="w-5 h-5"
                />
              </div>
              <p className="font-medium mt-2 text-red-600">
                Rs. {item?.price * item?.quantity}
              </p>
            </div>
          </div>
        );
      })}

      <div className="text-sm space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">FREE</span>
        </div>
      </div>

      <div className="flex justify-between font-bold text-lg mb-6 pt-6 border-t-2 border-gray-100">
        <span className="text-gray-800">Total</span>
        <span className="text-red-600">Rs. {subtotal.toFixed(2)}</span>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        🚚 Free Shipping Nationwide — Plus, enjoy a 15-day easy return policy!
      </p>
    </div>
  );
}

const inputStyle =
  "w-full px-4 py-1 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#70c1f3c2] focus:border-[#70c1f3c2] outline-none text-sm transition-all duration-200 placeholder-gray-400 hover:border-gray-300";

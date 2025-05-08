// import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import { useState } from "react";

// export default function CustomerPolicy() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const faqItems = [
//     {
//       question: "How do I return an item?",
//       answer:
//         "Send the article to our return address and our team will guide you through a refund or exchange.",
//     },
//     {
//       question: "Can I get a refund on a sale item?",
//       answer:
//         "Unfortunately, items with more than 20% discount are not eligible for a refund.",
//     },
//     {
//       question: "When will I receive my refund?",
//       answer:
//         "Refunds are processed within 15 working days after we receive the product at our head office.",
//     },
//   ];

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">
//             Customer Policy
//           </h1>
//           <p className="text-lg text-gray-600">
//             Henza’s commitment to your satisfaction
//           </p>
//         </div>

//         <div className="bg-white shadow-lg rounded-lg p-8 space-y-8">
//           {/* Refund & Exchange Policy */}
//           <div className="border-b border-gray-200 pb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               Refund & Exchange Policy
//             </h2>
//             <p className="text-gray-600 leading-relaxed">
//               At Henza, we strongly believe in the ‘customer first’ philosophy,
//               and we do everything to make sure our customers are well
//               satisfied. We are offering 15 days exchange and refund policy .
//               Which means you can buy our product and if you do not like it you
//               can simply return it and can have refund or you can choose another
//               item to exchange, purely your choice. We want you to buy with
//               confidence and feel free as we are here to help you choose that
//               best suits you. You can send back the article to our address and
//               we will make sure we assist you with a refund or replacement. You
//               can call on our helpline number and the agent will guide you
//               through. Your satisfaction is our win and we will win your trust,
//               no matter what. Refunds On Sales Product There is no refund on
//               sales products (Which have more then 20% discount)
//               <h1 className="font-semibold">Courier and Delivery Charges</h1>
//               Incase of Refund, you will receive the amount after deduction 500
//               PKR as a courier and delivery charges.
//               <h1 className="font-semibold">Return Period</h1>
//               If you have not used the item and it’s in the original condition
//               with packaging, invoice tagged and intact, you can return it with
//               in 15 days.
//               <h1 className="font-semibold">Refund Time</h1>
//               After the product is received at our head office. It usually takes
//               15 working Days to process the refunds and the same Bank Account
//               will be used to process refund amount.
//               <h1 className="font-semibold">Faulty Or Wrong Item Received</h1>
//               If you have received a faulty item or a wrong item or a wrong
//               size, simply send back to our Address .
//               <h1 className="font-semibold">Undelivered Parcel</h1>
//               In case if parcel returns as undelivered due to customer
//               negligence, The system will automatically put customer's account
//               on hold & for next orders customer has to pay in advance.
//               <h1 className="font-semibold">Return Address</h1>
//               Please send your items with the original Invoice at below address
//               <h1 className="font-semibold">Online Return Department</h1>
//               Building#88, Street#11, Royal Garden Society Near Premium American
//               School Harbanspura, Lahore, Pakistan, 54000 For support call us at
//               0315-7418509 Email us at henzarabeelofficial@gmail.com
//             </p>
//           </div>

//           {/* Privacy Policy */}
//           <div className="border-b border-gray-200 pb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               Privacy Policy
//             </h2>
//             <h1 className="font-semibold">Welcome to Henza</h1>
//             This Privacy Policy sets out the basis on which any personal data,
//             including but not limited to payment details and other information
//             we collect from you or other sources or that you provide to us
//             ("Information") will be handled by us in connection with your access
//             and use of www.henza.pk .We understand the importance you place on
//             the Information, and we are committed to protecting and respecting
//             your privacy. Please read the following carefully to understand our
//             practices regarding your Information.
//             <h1 className="font-semibold">
//               WHAT INFORMATION HENZA MAY COLLECT FROM YOU
//             </h1>
//             Henza may collect and process the following Information about you:
//             Information that you provide by filling in forms on our Platform,
//             including information provided at the time of registering to use our
//             Platform and other co- registrations (e.g. social media logins),
//             subscribing to our Services, posting material or requesting further
//             services; the Information you provide when you enter a competition
//             or promotion via our Platform, provide reviews, testimonials or
//             feedback on our Platform; Information you provide us, or that we may
//             collect from you, when you report a problem with our Platform; a
//             record of correspondence if you contact us; general, aggregated,
//             demographic and non-personal Information; if you download or use our
//             mobile application, we may have access to details about your
//             location and your mobile device, including a unique identifier for
//             your device; details of transactions you carry out through our
//             Platform and of the fulfilment of your orders; your email address
//             from a third party if you indicate that you have consented to that
//             third party sharing your Information with us; and any other
//             Information we consider necessary to enhance your experience on the
//             Platform.
//             <h1 className="font-semibold">
//               HOW HENZA WILL USE YOUR INFORMATION
//             </h1>
//             We may use Information held about you in the following ways: to
//             provide you with information, products or services that you request
//             from us or which we feel may interest you, where you have consented
//             to be contacted for such purposes; to provide you with
//             location-based services, such as advertising, search results, and
//             other personalised content; to carry out our obligations arising
//             from any contracts entered into between you and another entity using
//             our Platform or between you and us; to improve our Services and to
//             deliver a better and more personalised service to you; to ensure
//             that content from our Platform is presented in the most effective
//             manner for you and the device you use to access our Platform; to
//             notify you about changes to our Services; for any other reason which
//             we deem necessary to enhance your experience of the Platform; to
//             administer and manage our incentives programs and fulfil your
//             requests for incentives,and/or to allow you to participate in
//             sweepstakes and to notify you if you are a sweepstakes winner.
//             <h1 className="font-semibold">
//               TO WHOM HENZA MAY DISCLOSE YOUR INFORMATION
//             </h1>
//             Information about our customers is an important part of our
//             business. We share your Information only as described below and with
//             businesses that follow practices at least as protective as those
//             described in this Privacy Policy: Marketing and Promotional
//             Offers.We may also use your Information to provide you with
//             information about goods and services which may be of interest to you
//             and enhance your Platform experience, service messages, new
//             features, enhancements, special offers and events of interest. We
//             may contact you via various channels, including without limitation
//             emails, push notifications, web notifications, post, telephone,
//             in-app messages and news feed cards. We may permit third parties to
//             use your Information. For example, we may provide advertisers
//             Information to help them reach the kind of audience they want to
//             target and to enable us to comply with our commitments to our
//             advertisers (e.g. by displaying their advertisements to a target
//             audience). Additionally, you may be asked to provide additional
//             Information to participate in some of our market research
//             activities, including competitions and promotions. For example, if
//             you win a competition, you may be asked to provide further personal
//             data to establish your eligibility and provide you with the prize.
//             This Information may be collected by us or our co-sponsors or
//             vendors for the promotion. Note that you should review such third
//             parties’ privacy policies to see how they may use any information
//             that they collect. Protection of Our Platform and Others.We release
//             account and other Information when we believe such a release is
//             appropriate to comply with the law and law enforcement
//             investigations and to protect the rights, property or safety of our
//             users or others. This includes exchanging information with other
//             companies and organisations for various reasons, such as fraud
//             protection and credit risk reduction. Note that henza.pk as Platform
//             may, from time to time, contain links to and from the websites of
//             our partner networks, advertisers and affiliates. If you follow a
//             link to any of these websites, please note that these websites have
//             their own privacy policies and that we do not accept any
//             responsibility or liability for these policies. Please check these
//             policies before you submit any personal data or other information to
//             these websites.
//             <h1 className="font-semibold">HOW HENZA STOREs YOUR INFORMATION</h1>
//             The Information that we collect from you may be transferred to, and
//             stored at, a secure Henza destination. It may also be processed by
//             staff operating outside the Pakistan who work for us or for one of
//             our suppliers. Such staff may be engaged in, among other things, the
//             fulfilment of your order, the processing of your payment details and
//             the provision of support services. We will store your Information
//             for as long as necessary to fulfil the purposes indicated in this
//             Privacy.
//             <h1 className="font-semibold">
//               WHAT SECURITY MEASURES WE APPLY AT HENZA
//             </h1>
//             At Henza, we maintain commercially reasonable technical,
//             administrative, and physical safeguards to ensure your Information
//             is treated securely and in accordance with this Privacy Policy, and
//             to protect against unauthorized access or alteration to, disclosure,
//             or destruction of your Information. We may, for example, use
//             encryption technology to secure your Information during transmission
//             to our Platform.
//             <h1 className="font-semibold">
//               WHAT IF WE CHANGE OUR PRIVACY POLICY AT HENZA?
//             </h1>
//             Henza business changes takes place with time, and our Privacy Policy
//             may therefore also need to change. We will post the current version
//             of this Privacy Policy on the Platform and each such change will be
//             effective upon posting on the Platform or upon the date designated
//             by us as the "effective date". We may e-mail periodic reminders of
//             our notices and conditions, but you should check our Platform
//             frequently to see recent changes. It is your obligation to regularly
//             check the Privacy Policy.
//           </div>

//           {/* Customer Rights */}
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">
//               Customer Rights
//             </h2>
//             <h1 className="font-semibold">Your rights as Henza Customer</h1>
//             Being Henza’s valuable customer, you have full rights about your
//             personal data: You have the right to be informed of any personal
//             data which Henza may hold or process about you You have the right to
//             request access to the personal data which we may hold or process
//             about you You have the right to require us to correct any
//             inaccuracies in your data free of charge You have the right to ask
//             us to stop using your personal data for direct marketing purposes
//             You have the right to ask us to erase your personal data or restrict
//             the processing of your personal data You have the right to lodge a
//             complaint with the Henza Team.
//             <h1 className="font-semibold">
//               Something is not right or you have an issue?
//             </h1>
//             Contact our friendly customer service team and will be glad to
//             assist you. Henza.pk Building#88, Street#11, Royal Garden Society
//             Near Premium American School Harbanspura, Lahore, Pakistan, 54000
//             For support call us/Whatsapp at 0315-7418509 Email us at
//             henzarabeelofficial@gmail.com
//           </div>

//           {/* Shipping Information */}
//           <div className="mt-8">
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               Shipping Information
//             </h3>
//             <h2 className="font-semibold">How We Deliver</h2>· All the products
//             are free of cost delivered across Pakistan. · Orders from the major
//             cities of Pakistan are delivered within 3 – 5 working days. · Orders
//             from other cities and towns are delivered within 4-7 working days. ·
//             Orders placed after 5:00pm, will be dispatched next day. · Orders
//             placed over the weekend and/or at Public Holidays will be processed
//             on the next working day.
//             <h2 className="font-semibold">Cash On Delivery</h2>
//             We have COD option for our valued customers. Once the product
//             arrives, you can pay for it.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Footer from "../components/Footer/Footer";

export default function CustomerPolicy() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "How do I return an item?",
      answer:
        "Send the article to our return address and our team will guide you through a refund or exchange.",
    },
    {
      question: "Can I get a refund on a sale item?",
      answer:
        "Unfortunately, items with more than 20% discount are not eligible for a refund.",
    },
    {
      question: "When will I receive my refund?",
      answer:
        "Refunds are processed within 15 working days after we receive the product at our head office.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const SectionHeading = ({ children }) => (
    <h2 className="text-2xl font-bold text-gray-900 mb-6">{children}</h2>
  );

  const SubHeading = ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">{children}</h3>
  );

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Policy
          </h1>
          <p className="text-lg text-gray-600">
            Henza’s commitment to your satisfaction
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 space-y-8">
          {/* FAQ Section */}
          <div className="space-y-4">
            <SectionHeading>Frequently Asked Questions</SectionHeading>
            {faqItems.map((item, index) => (
              <div key={index} className="border border-[#075686] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-left font-medium text-gray-700">
                    {item.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transform transition-transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeIndex === index && (
                  <div className="p-4 bg-white border-t border-[#075686]">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Refund & Exchange Policy */}
          <div id="refund&exchange" className="border-b border-gray-200 pb-8">
            <SectionHeading>Refund & Exchange Policy</SectionHeading>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                At Henza, we strongly believe in the ‘customer first’ philosophy,
                and we do everything to make sure our customers are well satisfied.
                We offer a 15-day exchange and refund policy. You can return items
                for a refund or exchange, with the following conditions:
              </p>

              <SubHeading>Courier and Delivery Charges</SubHeading>
              <p>
                For refunds, we deduct 500 PKR as courier and delivery charges.
              </p>

              <SubHeading>Return Period</SubHeading>
              <p>
                Items must be unused, in original condition with packaging and
                invoice intact, and returned within 15 days.
              </p>

              <SubHeading>Refund Time</SubHeading>
              <p>
                Refunds are processed within 15 working days after receiving the
                product at our head office, using the original payment method.
              </p>

              <SubHeading>Faulty or Wrong Item Received</SubHeading>
              <p>
                Please return faulty, incorrect, or wrong-sized items to our
                address.
              </p>

              <SubHeading>Undelivered Parcel</SubHeading>
              <p>
                Accounts may be put on hold for undelivered parcels due to
                customer negligence, requiring advance payment for future orders.
              </p>

              <SubHeading>Return Address</SubHeading>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Online Return Department</p>
                <p className="mt-2">
                  Building#88, Street#11, Royal Garden Society<br />
                  Near Premium American School<br />
                  Harbanspura, Lahore, Pakistan, 54000<br />
                  Phone: 0315-7418509<br />
                  Email: henzarabeelofficial@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div id="privacyPolicy" className="border-b border-gray-200 pb-8">
            <SectionHeading>Privacy Policy</SectionHeading>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <SubHeading>Welcome to Henza</SubHeading>
              <p>
                We collect and process personal data to provide our services while
                respecting your privacy. This policy explains how we handle your
                information.
              </p>

              <SubHeading>Information We Collect</SubHeading>
              <p>
                We collect information you provide through forms, transactions,
                and interactions with our platform, including device information
                and location data.
              </p>

              <SubHeading>How We Use Information</SubHeading>
              <p>
                We use your data to provide services, improve user experience,
                process transactions, and communicate with you about offers and
                updates.
              </p>

              <SubHeading>Data Sharing</SubHeading>
              <p>
                We may share information with third parties for marketing,
                legal compliance, and service improvement, always ensuring
                adequate data protection.
              </p>

              <SubHeading>Data Security</SubHeading>
              <p>
                We implement security measures including encryption to protect
                your information during transmission and storage.
              </p>

              <SubHeading>Policy Updates</SubHeading>
              <p>
                We may update this policy periodically. Please check our platform
                regularly for changes.
              </p>
            </div>
          </div>

          {/* Customer Rights */}
          <div id="customerRight" className="border-b border-gray-200 pb-8">
            <SectionHeading>Customer Rights</SectionHeading>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <SubHeading>Your Rights</SubHeading>
              <ul className="list-disc pl-5 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to request corrections</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to lodge complaints</li>
              </ul>

              <SubHeading>Contact Us</SubHeading>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Henza Customer Service</p>
                <p className="mt-2">
                  Phone/WhatsApp: 0315-7418509<br />
                  Email: henzarabeelofficial@gmail.com<br />
                  Address: Same as return address above
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div id="deliveryPolicy" className="pt-8">
            <SectionHeading>Shipping Information</SectionHeading>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <SubHeading>Delivery Details</SubHeading>
              <ul className="list-disc pl-5 space-y-2">
                <li>Free nationwide delivery across Pakistan</li>
                <li>3-5 working days for major cities</li>
                <li>4-7 working days for other areas</li>
                <li>Orders after 5:00 PM processed next day</li>
                <li>Weekend/holiday orders processed next working day</li>
              </ul>

              <SubHeading>Cash On Delivery</SubHeading>
              <p>
                Available nationwide - pay when your order arrives at your
                doorstep.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
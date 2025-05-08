import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";


const OneTimeShowModel = () => {
  const [open, setOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hideDeactivateModal");
    if (!hasSeenModal) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("hideDeactivateModal", "true");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-transparent transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white shadow-black shadow-sm px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
              <button onClick={handleClose} className="absolute right-4 text-xl top-3"><RxCross2 color="#af8a39" /></button>
                  <DialogTitle
                    as="h3"
                    className="text-2xl font-semibold text-gray-900"
                  >
                    Refund & Exchange Policy
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-md text-gray-500">
                      1 Year Free Shoe Servicing & Polishing. 15 Days Refund &
                      Exchnage.
                    </p>
                    <input
                      placeholder="Email Address"
                      className="border w-[90%] py-1 px-2 border-gray-300 rounded-sm mt-8 mb-5"
                    />
                    <button className="bg-[#af8a39] text-white text-center w-[90%] py-2 rounded-sm font-semibold text-lg">
                      Subscribe
                    </button>
                    <div className="w-[100%] py-3 flex justify-center items-center text-blue-900 gap-6">
                      <FaFacebookF size={16}/>
                      <FaTwitter size={16} />
                      <FaPinterestP size={18} />
                      <FaInstagram size={18} />
                      <FaYoutube size={20} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <input
                      type="checkbox"
                      id="dontShowAgain"
                      checked={dontShowAgain}
                      onChange={() => setDontShowAgain(!dontShowAgain)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="dontShowAgain"
                      className="text-sm text-gray-700"
                    >
                      Don’t Show This Popup Again
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default OneTimeShowModel;

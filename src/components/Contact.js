import { useState } from "react";
import { Element } from "react-scroll";
import "./Contact.css";

const CONTACT_EMAIL = "siddharthgogireddy@gmail.com"; // replace with your real email

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // open user's email client with prefilled values (simple, no backend)
    const subject = encodeURIComponent(`Website message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("ready");
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setStatus("copied");
      setTimeout(() => setStatus(null), 2000);
    } catch (e) {
      setStatus("copy-failed");
      setTimeout(() => setStatus(null), 2000);
    }
  };

  return (
    <Element id="contact" name="contact" className="w-full min-h-screen pt-24 px-6 reveal">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 reveal-child">Contact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-child">
          {/* Left: contact info */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#ED985F]">Get in touch</h3>
            <p className="mt-3 text-gray-300">I’m open to new opportunities and collaborations. Reach out and I’ll get back soon.</p>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M2 7v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 7l-10 7L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <button className="text-gray-300 hover:text-white" onClick={handleCopyEmail} aria-label="Copy email">{CONTACT_EMAIL}</button>
              </div>

              <div className="mt-4 space-x-3">
                <a className="text-[#ED985F] hover:text-white font-semibold" href="https://www.linkedin.com/in/siddharth-gogireddy-67b427298/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className="text-[#ED985F] hover:text-white font-semibold" href="https://github.com/SiddharthGogireddy" target="_blank" rel="noreferrer">GitHub</a>
              </div>

              {status === "copied" && <div className="mt-4 text-sm text-green-400">Email copied to clipboard.</div>}
              {status === "ready" && <div className="mt-4 text-sm text-yellow-400">Your email client should open — paste/send to submit.</div>}
            </div>
          </div>

          {/* Right: form */}
          <form className="bg-gray-900 rounded-lg p-6" onSubmit={handleSubmit} noValidate>
            <label className="block">
              <span className="text-sm text-[#ED985F] font-semibold">Name</span>
              <input name="name" value={form.name} onChange={handleChange} className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-transparent'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`} aria-invalid={!!errors.name} />
              {errors.name && <div className="text-sm text-red-400 mt-1">{errors.name}</div>}
            </label>

            <label className="block mt-4">
              <span className="text-sm text-[#ED985F] font-semibold">Email</span>
              <input name="email" value={form.email} onChange={handleChange} className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-transparent'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`} aria-invalid={!!errors.email} />
              {errors.email && <div className="text-sm text-red-400 mt-1">{errors.email}</div>}
            </label>

            <label className="block mt-4">
              <span className="text-sm text-[#ED985F] font-semibold">Message</span>
              <textarea name="message" value={form.message} onChange={handleChange} rows={6} className={`mt-1 block w-full rounded-md bg-gray-800 border ${errors.message ? 'border-red-500' : 'border-transparent'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`} aria-invalid={!!errors.message} />
              {errors.message && <div className="text-sm text-red-400 mt-1">{errors.message}</div>}
            </label>

            <div className="mt-6 flex items-center gap-3">
              <button type="submit" className="px-4 py-2 rounded bg-yellow-500 text-black font-semibold hover:bg-yellow-600">Send message</button>
              <button type="button" onClick={() => { setForm({ name: "", email: "", message: "" }); setErrors({}); setStatus(null); }} className="px-3 py-2 rounded border border-gray-700 text-gray-300 hover:border-gray-500">Reset</button>
            </div>

            <p className="mt-4 text-sm text-gray-400">Prefer email? <button type="button" onClick={handleCopyEmail} className="underline">Copy email address</button>.</p>
          </form>
        </div>
         <h4 className="text-center text-[#3DB6B1] font-light mt-5"> Designed and Developed by Siddharth Gogireddy </h4>
      </div>
    </Element>

  );
};

export default Contact;

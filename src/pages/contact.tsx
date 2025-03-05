import { useState } from 'react';
import { Mail, User, Phone, MessageSquare, Send, Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sendToTelegram } from '@/lib/tracking';
import toast from 'react-hot-toast';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `
📬 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${formData.name}
📧 <b>Email:</b> ${formData.email}
📱 <b>Phone:</b> ${formData.phone}

💬 <b>Message:</b>
${formData.message}
`;

      await sendToTelegram(message);
      
      toast.success('Message sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-blue-100 mb-8">
                Have questions about our services? We're here to help! Fill out the form and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-blue-100">surajkumar@quycan.software</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-blue-100">+91 6294584859</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageSquare className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">Telegram</h3>
                    <a 
                      href="https://t.me/QuycanSoftware" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      @QuycanSoftware
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CreditCard className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">PAN</h3>
                    <p className="text-blue-100">JUDPK8588M</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-semibold mb-4">Office Location</h3>
                <p className="text-blue-100">
                  Parawan Dhanupur<br />
                  Allahabad 221503<br />
                  Uttar Pradesh<br />
                  India
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="sr-only">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your message"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
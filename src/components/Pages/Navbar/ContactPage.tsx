
import { Mail, Phone, Headset, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 md:mb-12 text-gray-900">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left Column: Information */}
        <div className="space-y-10">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed text-lg">
              Email, Call, Or Complete The Form To Tell Us About Your Problem Or Suggestion.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <a href="mailto:bugsy@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors font-medium underline underline-offset-4">
                <Mail className="w-5 h-5 text-gray-500" />
                bugsy@gmail.com
              </a>
              <a href="tel:+12029182132" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors font-medium underline underline-offset-4">
                <Phone className="w-5 h-5 text-gray-500" />
                +1 202-918-2132
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
              <Headset className="w-5 h-5" />
              Customer Support
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our support team is available around the clock to address any concerns or queries you may have.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
              <MessageSquare className="w-5 h-5" />
              Feedback and Suggestion
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We value your feedback and are continuously working to improve our service. Your input is crucial in shaping the future.
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-[#FDF2F2] border border-pink-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 ml-1">
                Name
              </label>
              <Input
                id="name"
                placeholder="Enter your name"
                className="bg-white border-pink-100 focus-visible:ring-pink-200 h-10 md:h-11"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-white border-pink-100 focus-visible:ring-pink-200 h-10 md:h-11"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 ml-1">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone"
                className="bg-white border-pink-100 focus-visible:ring-pink-200 h-10 md:h-11"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 ml-1">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Type something if you want"
                className="bg-white border-pink-100 focus-visible:ring-pink-200 min-h-[120px] resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#500000] hover:bg-[#3a0000] text-white rounded-full h-11 md:h-12 text-base font-medium shadow-md transition-all hover:scale-[1.01]"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
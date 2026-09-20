import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Contact", "Contact TEAM PETRA about PETRA, the property management platform.", "/contact");
import { DemoForm } from "@/components/forms";
import { PageHero } from "@/components/site";

export default function ContactPage() {
  return <main id="main-content"><PageHero kicker="CONTACT TEAM PETRA" title="Have a question about PETRA?" text="Send a message about the product, its direction, or a potential property-management use case. This is a conversation form, not a hotel reservation channel." /><section className="section conversion-section"><div className="container conversion-grid"><div className="conversion-copy"><span className="page-kicker">START A CONVERSATION</span><h2>Ask about the product, workflow or next step.</h2><p>TEAM PETRA is developing PETRA as a focused property management platform. Share the context that will help us understand your question.</p><div className="contact-note"><strong>Not a booking service</strong><span>PETRA Bangladesh is the public product website. PETRA is not a consumer hotel-booking marketplace.</span></div></div><div className="form-card"><DemoForm mode="contact" /></div></div></section></main>;
}

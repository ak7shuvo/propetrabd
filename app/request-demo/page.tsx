import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Request a Demo", "Request a PETRA demonstration for your hospitality property.", "/request-demo");
import { DemoForm } from "@/components/forms";
import { PageHero } from "@/components/site";

export default function RequestDemoPage() {
  return <main id="main-content"><PageHero kicker="REQUEST A DEMO" title="Let’s talk about your property." text="Share a few details about your operation. The form is designed for a qualified product conversation, not an instant purchase or booking flow." /><section className="section conversion-section"><div className="container conversion-grid"><div className="conversion-copy"><span className="page-kicker">WHAT TO EXPECT</span><h2>A practical conversation about the way you operate.</h2><p>Use this request to tell TEAM PETRA what kind of property you manage and which operational areas you want to explore in PETRA.</p><div className="conversion-points"><div><strong>Property context</strong><span>Tell us the property type and approximate room count.</span></div><div><strong>Operational needs</strong><span>Share the workflows or challenges you want to discuss.</span></div><div><strong>Product conversation</strong><span>Explore the documented PETRA direction without a hard-sell booking flow.</span></div></div></div><div className="form-card"><DemoForm /></div></div></section></main>;
}

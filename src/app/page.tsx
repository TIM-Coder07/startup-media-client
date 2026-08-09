import BannerSlider from "@/Component/Home/BannerSlider";
import FeaturedFounders from "@/Component/Home/FeaturedFounders";
import HeroBanner from "@/Component/Home/HeroBanner";
import Footer from "@/Component/Shared/Footer";

export default function Home() {
  return (
    <div className=" min-h-screen py-2 container mx-auto">
      <section className="">
        <HeroBanner />
      </section>
      
      <section className="py-10">
        <BannerSlider />
      </section>

      {/*TODO:-> FETURED STARTUPS */}

      <section className="py-10">
        <FeaturedFounders></FeaturedFounders>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

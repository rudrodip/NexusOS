import { FeatureOne } from "./feature-one";
import { FeatureTwo } from "./feature-two";
import { FeatureCardOne } from "@/components/feature/feeatureCardOne";
import { FeatureCardTwo } from "./featureCardTwo";
import { HeroPopup } from "../header/hero-popup-animation";
import { CardGroup } from "../card-group/card-group";
import { FeaturePopup1 } from "./featurePop1";
import { FeaturePopup2 } from "./featurePop2";

export const Features = () => {
  return (
    <section id="features">
      <h1 className="text-center head-text">Features</h1>
      <CardGroup />
      <FeatureOne
        name="Accelerate the progress of NASA's Open Science Initiative"
        desc={{
          title: "Find contributors ",
          sub: "for your open source projects through NexusOS, and build network",
        }}
        FeatureCard={FeatureCardOne}
      />
      <FeatureTwo 
        desc="Nexbee, the integrated AI can not only explain research papers but also can answer questions about it. Give it a try"
        punchques="Did you know?"
        punchlines={["Nexbee ", "can explain research paper also"]}
        link={{text: "Checkout", url: "idk"}}
        FeatureCard={FeaturePopup1}
      />
      <FeatureOne
        name="Repository Explained in seconds"
        desc={{
          title: "Nexbee ",
          sub: "can explain complex repository easily for you in seconds.",
        }}
        FeatureCard={FeatureCardTwo}
      />
      <FeatureTwo 
        desc="Nexbee can answer almost anything you want to know, from any scientific topic to niche programming topics"
        punchques="Ask Nexbee Anything"
        punchlines={["Try asking", "anything you want to know"]}
        link={{text: "Checkout", url: "idk"}}
        FeatureCard={FeaturePopup2}
      />
    </section>
  );
};

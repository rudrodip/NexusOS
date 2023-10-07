import { FeatureOne } from "./feature-one";
import { FeatureTwo } from "./feature-two";
import { FeatureCardOne } from "@/components/feature/feeatureCardOne";
import { HeroPopup } from "../header/hero-popup-animation";
import { CardGroup } from "../card-group/card-group";

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
        desc="GitHub Codespaces offers a complete dev environment in seconds, so you can code, build, test, and open pull requests from any repo anywhere."
        punchques="Did you know?"
        punchlines={["22% increase", "in developer productivity"]}
        link={{text: "Checkout", url: "idk"}}
        FeatureCard={HeroPopup}
      />
      <FeatureOne
        name="Contribute to OS"
        desc={{
          title: "Collaborate Openly",
          sub: "some blah blah stuff val lage na dhur",
        }}
        FeatureCard={FeatureCardOne}
      />
      <FeatureTwo 
        desc="GitHub Codespaces offers a complete dev environment in seconds, so you can code, build, test, and open pull requests from any repo anywhere."
        punchques="Did you know?"
        punchlines={["22% increase", "in developer productivity"]}
        link={{text: "Checkout", url: "idk"}}
        FeatureCard={HeroPopup}
      />
    </section>
  );
};

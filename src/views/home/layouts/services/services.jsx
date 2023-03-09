import { useContext } from "react";
import { Link } from "react-router-dom";

import SectionSpan from "../../../../components/general/section-span/section-span";
import Slider from "../../../../components/slider/slider/slider";
import Image from "../../../../components/general/image/image";

import styles from "./services.module.css";

import useContent from "../../../../hooks/use-content/";

export default function Services() {
  const [content, images] = useContent();
  const servicesContext = content.home.services;
  const projectCatContext = servicesContext.projectCat;
  const projectImages = images.projectCategories;

  return (
    <section
      className={styles.section}
      id="HomeServices">
      <div className={styles.center}>
        <SectionSpan>{servicesContext.span}</SectionSpan>
        <h2 className="h3">{servicesContext.title}</h2>
      </div>

      <Slider
        autoPlay={true}
        containerClass={styles.container}
        dotListClass={styles.dots}>
        {projectCatContext.map((cur, i) => (
          <Link
            to={cur.to}
            key={cur.title}>
            <Image
              src={projectImages[cur.image]}
              alt={cur.alt}
              title={cur.title}
            />
          </Link>
        ))}
      </Slider>
    </section>
  );
}
